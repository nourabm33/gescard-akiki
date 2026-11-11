import assert from "node:assert/strict";
import test from "node:test";
import { refreshProviders, syncMedia } from "./sync-media.mjs";

const now = Date.parse("2026-11-11T12:00:00Z");
const channelId = "UC0nUh3MAbXAzFZgUdFDm3Gw";
const config = {
  youtube: { channelId, minimumDurationSeconds: 181, includeIds: ["aSj8hyUn8EA"], excludeIds: [] },
  instagram: { username: "gescard.akiki" },
};
const env = {
  GITHUB_REPOSITORY: "nourabm33/gescard-akiki",
  GITHUB_TOKEN: "fixture-github-token",
  YOUTUBE_API_KEY: "fixture-youtube-key",
  INSTAGRAM_ACCESS_TOKEN: "fixture-instagram-token",
  INSTAGRAM_API_VERSION: "v24.0",
};
const log = { info() {}, warn() {} };
const old = { updatedAt: "2026-11-10T12:00:00Z", items: [{ id: "REMOVED0001" }] };
const json = (body, status = 200) => new Response(JSON.stringify(body), { status });

function video(id, duration, day, privacyStatus = "public") {
  return {
    id,
    snippet: {
      title: `Video ${id}`, channelId, publishedAt: `2026-11-${day}T09:00:00Z`,
      liveBroadcastContent: "none",
      thumbnails: { high: { url: `https://i.ytimg.com/vi/${id}/hqdefault.jpg` } },
    },
    contentDetails: { duration },
    status: { privacyStatus, embeddable: true },
  };
}

function youtube(url, options) {
  assert.equal(options.headers["X-Goog-Api-Key"], env.YOUTUBE_API_KEY);
  assert.equal(url.searchParams.has("key"), false);
  if (url.pathname.endsWith("/channels")) {
    return json({ items: [{ id: channelId, contentDetails: { relatedPlaylists: { uploads: "uploads" } } }] });
  }
  if (url.pathname.endsWith("/playlistItems")) {
    const ids = ["3GBvqaLy84I", "85C-TfhOV6c", "aSj8hyUn8EA", "qnVRccfgnLY"];
    return json({ items: ids.map((id) => ({ contentDetails: { videoId: id } })) });
  }
  assert.ok(url.pathname.endsWith("/videos"));
  return json({ items: [
    video("3GBvqaLy84I", "PT14M26S", "09"),
    video("85C-TfhOV6c", "PT3M", "11"),
    video("aSj8hyUn8EA", "PT2M40S", "10"),
    video("qnVRccfgnLY", "PT12M23S", "11", "unlisted"),
  ] });
}

function instagram(url, options) {
  assert.equal(options.headers.Authorization, `Bearer ${env.INSTAGRAM_ACCESS_TOKEN}`);
  assert.equal(url.searchParams.has("access_token"), false);
  if (url.pathname.endsWith("/me")) return json({ user_id: "123", username: "gescard.akiki" });
  assert.ok(url.pathname.endsWith("/123/media"));
  return json({ data: [
    { media_type: "VIDEO", media_product_type: "REELS", permalink: "https://www.instagram.com/p/DfUPIG9RKjM/", caption: "  On site at Expo Living  \nFull caption", timestamp: "2026-11-09T12:00:00Z", thumbnail_url: "https://scontent.cdninstagram.com/reel.jpg" },
    { media_type: "VIDEO", media_product_type: "FEED", permalink: "https://www.instagram.com/p/DfaGJAdxWt7/", timestamp: "2026-11-10T12:00:00Z" },
  ] });
}

test("YouTube ranks newest public long-form uploads and removes missing, unlisted and short items", async () => {
  const { next, failed } = await refreshProviders({ youtube: old }, {
    env: { YOUTUBE_API_KEY: env.YOUTUBE_API_KEY }, config, fetcher: youtube, now, log,
  });
  assert.equal(failed, false);
  assert.deepEqual(next.youtube.items.map(({ id, duration }) => [id, duration]), [
    ["aSj8hyUn8EA", "2:40"], ["3GBvqaLy84I", "14:26"],
  ]);
});

test("Instagram accepts only Reels from the configured profile and retains its cache on a failed refresh", async () => {
  const first = await refreshProviders({}, { env, config, now, log, fetcher: (url, options) => (
    url.hostname === "graph.instagram.com" ? instagram(url, options) : json({}, 429)
  ) });
  assert.equal(first.failed, true);
  assert.deepEqual(first.next.instagram.items.map(({ id, title }) => [id, title]), [["DfUPIG9RKjM", "On site at Expo Living"]]);
  const next = await refreshProviders(first.next, {
    env, config, now: now + 6000, log,
    fetcher: (url, options) => url.hostname === "graph.instagram.com"
      ? json({ user_id: "456", username: "another.account" })
      : youtube(url, options),
  });
  assert.equal(next.failed, true);
  assert.deepEqual(next.next.instagram, first.next.instagram);
  assert.ok(next.next.youtube.items.length);
});

test("an old snapshot expires and an explicit cache clear removes Instagram API data", async () => {
  const { next } = await refreshProviders({ youtube: old, instagram: old }, {
    env: { CLEAR_INSTAGRAM_CACHE: "true" }, config, now: now + 29 * 86400000, log,
  });
  assert.equal(next.youtube, undefined);
  assert.equal(next.instagram, undefined);
});

test("the scheduled job updates a public snapshot without credentials or provider response bodies", async () => {
  let stored;
  const fetcher = (input, options) => {
    const url = new URL(input);
    if (url.hostname === "www.googleapis.com") return youtube(url, options);
    if (url.hostname === "graph.instagram.com") return instagram(url, options);
    assert.equal(url.hostname, "api.github.com");
    if (options.method === "GET") {
      return json({
        id: 10, name: "Website media cache", prerelease: true, draft: false,
        body: JSON.stringify({ version: 1, youtube: old }),
      });
    }
    assert.equal(options.method, "PATCH");
    assert.ok(url.pathname.endsWith("/releases/10"));
    assert.doesNotMatch(options.body, /fixture-|access_token|Authorization|REMOVED0001/);
    stored = JSON.parse(JSON.parse(options.body).body);
    return json({ id: 10 });
  };
  assert.equal(await syncMedia({ env, fetcher, now, log }), true);
  assert.equal(stored.youtube.items[0].id, "3GBvqaLy84I");
  assert.equal(stored.instagram.items[0].id, "DfUPIG9RKjM");
});
