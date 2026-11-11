const feedLimit = 6;
const videoIdPattern = /^[A-Za-z0-9_-]{11}$/;

export function safeThumbnail(value, domains) {
  if (typeof value !== "string" || value.length > 2048) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return undefined;
    if ([...url.searchParams.keys()].some((key) => /^(access_token|token|api_key|key)$/i.test(key))) return undefined;
    if (domains.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) return url.href;
  } catch {
    return undefined;
  }
}

function sortedRecent(items) {
  return items.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)).slice(0, feedLimit);
}

function durationSeconds(value) {
  const match = /^P(?:(\d+)D)?T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(value ?? "");
  if (!match) return 0;
  const [days, hours, minutes, seconds] = match.slice(1).map((part) => Number(part ?? 0));
  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}

function durationLabel(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  const tail = String(seconds % 60).padStart(2, "0");
  return hours ? `${hours}:${String(minutes % 60).padStart(2, "0")}:${tail}` : `${minutes}:${tail}`;
}

function cleanText(value, max) {
  return typeof value === "string" ? value.replace(/[\u0000-\u001f\u007f]+/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : "";
}

async function requestJson(fetcher, url, headers, label) {
  // Error text omits full request URLs and response bodies because they can contain credentials.
  let response;
  try {
    response = await fetcher(url, { headers, redirect: "error", signal: AbortSignal.timeout(15000) });
  } catch {
    throw new Error(`${label} request failed`);
  }
  if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}`);
  try {
    return await response.json();
  } catch {
    throw new Error(`${label} returned invalid JSON`);
  }
}

function requireList(value, label) {
  if (!Array.isArray(value)) throw new Error(`${label} response is missing its item list`);
  return value;
}

export async function fetchYouTube({ fetcher, key, config, previousIds = [] }) {
  const get = (endpoint, params) => {
    const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
    url.search = new URLSearchParams(params);
    return requestJson(fetcher, url, { "X-Goog-Api-Key": key }, `YouTube ${endpoint}`);
  };
  const channel = await get("channels", { part: "contentDetails", id: config.channelId });
  const uploads = channel.items?.find((item) => item.id === config.channelId)?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploads) throw new Error("YouTube uploads playlist is missing for the configured channel");

  const ids = new Set([...config.includeIds, ...previousIds].filter((id) => videoIdPattern.test(id)));
  let pageToken;
  for (let page = 0; page < 3; page += 1) {
    const batch = await get("playlistItems", {
      part: "contentDetails", playlistId: uploads, maxResults: "50", ...(pageToken ? { pageToken } : {}),
    });
    for (const item of requireList(batch.items, "YouTube uploads")) {
      const id = item.contentDetails?.videoId;
      if (videoIdPattern.test(id ?? "")) ids.add(id);
    }
    pageToken = batch.nextPageToken;
    if (!pageToken) break;
  }

  const candidates = [...ids];
  const items = [];
  for (let start = 0; start < candidates.length; start += 50) {
    const result = await get("videos", {
      part: "snippet,contentDetails,status", id: candidates.slice(start, start + 50).join(","),
    });
    for (const video of requireList(result.items, "YouTube videos")) {
      const { id, snippet, status, contentDetails } = video;
      if (!ids.has(id) || snippet?.channelId !== config.channelId || status?.privacyStatus !== "public") continue;
      if (snippet.liveBroadcastContent !== "none" || config.excludeIds.includes(id)) continue;
      const seconds = durationSeconds(contentDetails?.duration);
      if (!seconds || (seconds < config.minimumDurationSeconds && !config.includeIds.includes(id))) continue;
      if (!Number.isFinite(Date.parse(snippet.publishedAt))) continue;
      const title = cleanText(snippet.title, 160);
      const sizes = snippet.thumbnails;
      const thumbnail = [sizes?.maxres, sizes?.standard, sizes?.high, sizes?.medium]
        .map((size) => safeThumbnail(size?.url, ["ytimg.com", "img.youtube.com"])).find(Boolean);
      if (title && thumbnail) items.push({
        id, title, thumbnail, publishedAt: snippet.publishedAt,
        duration: durationLabel(seconds), embeddable: status.embeddable === true,
      });
    }
  }
  return sortedRecent(items);
}

export async function fetchInstagram({ fetcher, token, version, config }) {
  if (!/^v\d+\.\d+$/.test(version)) throw new Error("Configure INSTAGRAM_API_VERSION as a supported Meta Graph API version");
  const get = (endpoint, params) => {
    const url = new URL(`https://graph.instagram.com/${version}/${endpoint}`);
    url.search = new URLSearchParams(params);
    return requestJson(fetcher, url, { Authorization: `Bearer ${token}` }, "Instagram API");
  };
  const profile = await get("me", { fields: "user_id,username" });
  const owner = String(profile.user_id ?? profile.id ?? "");
  if (profile.username?.toLowerCase() !== config.username.toLowerCase() || !/^\d+$/.test(owner)) {
    throw new Error("Instagram token belongs to a different or inaccessible account");
  }
  const reels = new Map();
  let after;
  for (let page = 0; page < 3; page += 1) {
    const result = await get(`${owner}/media`, {
      fields: "id,caption,media_type,media_product_type,permalink,thumbnail_url,timestamp",
      limit: "50", ...(after ? { after } : {}),
    });
    for (const item of requireList(result.data, "Instagram media")) {
      if (item.media_type !== "VIDEO" || item.media_product_type !== "REELS") continue;
      const match = /^https:\/\/(?:www\.)?instagram\.com\/(?:[\w.]+\/)?(?:reel|p)\/([\w-]{5,24})\/?(?:\?[^#]*)?$/.exec(item.permalink ?? "");
      if (!match || !Number.isFinite(Date.parse(item.timestamp))) continue;
      const id = match[1];
      const caption = typeof item.caption === "string" ? item.caption.split(/\r?\n/).find((line) => line.trim()) : "";
      reels.set(id, {
        id, title: cleanText(caption, 128) || "Reel by Gescard Akiki", topic: "Instagram Reel",
        thumbnail: safeThumbnail(item.thumbnail_url, ["cdninstagram.com", "fbcdn.net"]),
        publishedAt: item.timestamp,
      });
    }
    after = result.paging?.next && result.paging?.cursors?.after;
    if (!after || reels.size >= feedLimit) break;
  }
  return sortedRecent([...reels.values()]);
}
