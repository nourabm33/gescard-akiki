import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { fetchInstagram, fetchYouTube } from "./media-providers.mjs";

const releaseTag = "media-feed";
const releaseName = "Website media cache";
const cacheLifetime = 28 * 24 * 60 * 60 * 1000;

function recent(snapshot, now) {
  const age = now - Date.parse(snapshot?.updatedAt);
  return age >= 0 && age < cacheLifetime && Array.isArray(snapshot?.items) ? snapshot : undefined;
}

export async function refreshProviders(previous, { env, config, fetcher, now = Date.now(), log = console }) {
  const next = { version: 1 };
  let failed = false;
  const refresh = async (platform, loader) => {
    const cached = recent(previous[platform], now);
    if (!loader) {
      if (cached) next[platform] = cached;
      log.info(`${platform}: credentials not configured`);
      return;
    }
    try {
      const items = await loader(cached);
      next[platform] = { updatedAt: new Date(now).toISOString(), items };
      log.info(`${platform}: refreshed ${items.length} public items`);
    } catch (error) {
      if (cached) next[platform] = cached;
      failed = true;
      log.warn(`${platform}: ${error.message}. ${cached ? "Keeping the last successful snapshot." : "Using the site fallback."}`);
    }
  };

  await Promise.all([
    refresh("youtube", env.YOUTUBE_API_KEY && ((cached) => fetchYouTube({
      fetcher, key: env.YOUTUBE_API_KEY, config: config.youtube,
      previousIds: cached?.items.map((item) => item.id),
    }))),
    env.CLEAR_INSTAGRAM_CACHE === "true"
      ? log.info("instagram: cached API data cleared on request")
      : refresh("instagram", env.INSTAGRAM_ACCESS_TOKEN && (() => fetchInstagram({
        fetcher, token: env.INSTAGRAM_ACCESS_TOKEN,
        version: env.INSTAGRAM_API_VERSION, config: config.instagram,
      }))),
  ]);
  // Use a fixed key order so an unchanged snapshot does not cause a write.
  return { next: { version: 1, youtube: next.youtube, instagram: next.instagram }, failed };
}

export async function syncMedia({ env = process.env, fetcher = fetch, now, log = console } = {}) {
  if (env.GITHUB_REPOSITORY?.toLowerCase() !== "nourabm33/gescard-akiki" || !env.GITHUB_TOKEN) {
    throw new Error("Run media synchronisation in the authorised repository workflow");
  }
  const config = JSON.parse(await readFile(new URL("../media-sync.config.json", import.meta.url), "utf8"));
  const endpoint = "https://api.github.com/repos/nourabm33/gescard-akiki/releases";
  const github = (path, method = "GET", payload) => fetcher(`${endpoint}${path}`, {
    method,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: payload ? JSON.stringify(payload) : undefined,
    redirect: "error",
    signal: AbortSignal.timeout(15000),
  });
  const current = await github(`/tags/${releaseTag}`);
  if (!current.ok && current.status !== 404) throw new Error(`Cannot read media cache (HTTP ${current.status})`);
  const release = current.ok ? await current.json() : undefined;
  let previous = { version: 1 };
  if (release) {
    if (release.name !== releaseName || !release.prerelease || release.draft || !Number.isInteger(release.id)) {
      throw new Error("The media-feed tag is occupied by a different release");
    }
    previous = JSON.parse(release.body);
    if (previous?.version !== 1) throw new Error("Unrecognised media cache version");
  }

  const { next, failed } = await refreshProviders(previous, { env, config, fetcher, now, log });
  const body = JSON.stringify(next);
  if (JSON.stringify(previous) === body) return !failed;
  if (!release && !next.youtube && !next.instagram) return !failed;
  const saved = release
    ? await github(`/${release.id}`, "PATCH", { body })
    : await github("", "POST", {
      tag_name: releaseTag, name: releaseName, target_commitish: "main", body,
      prerelease: true, make_latest: "false",
    });
  if (!saved.ok) throw new Error(`Cannot publish media cache (HTTP ${saved.status})`);
  log.info("Published the public media snapshot");
  return !failed;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (!await syncMedia()) process.exitCode = 1;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
