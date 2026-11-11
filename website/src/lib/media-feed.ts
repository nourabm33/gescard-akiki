import type { InstagramReel } from "@/data/instagram";
import type { Video } from "@/data/videos";

const cacheLifetime = 28 * 24 * 60 * 60 * 1000;
const maxItems = 6;

type Snapshot<T> = { updatedAt: string; items: T[] };
export type MediaFeed = { youtube?: Snapshot<Video>; instagram?: Snapshot<InstagramReel> };

function record(value: unknown): Record<string, unknown> | undefined {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function thumbnail(value: unknown, domains: string[]) {
  if (typeof value !== "string" || value.length > 2048) return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "https:" && !url.username && !url.password && !url.port
      && domains.some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))
      && ![...url.searchParams.keys()].some((key) => /^(access_token|token|api_key|key)$/i.test(key))) {
      return url.href;
    }
  } catch {
    return undefined;
  }
}

function video(value: unknown): Video | undefined {
  const item = record(value);
  if (typeof item?.id !== "string" || !/^[\w-]{11}$/.test(item.id)
    || typeof item.title !== "string" || !item.title.trim()
    || typeof item.duration !== "string" || !/^(?:\d+:)?\d+:\d{2}$/.test(item.duration)) return undefined;
  return {
    id: item.id, title: item.title.slice(0, 160), duration: item.duration,
    thumbnail: thumbnail(item.thumbnail, ["ytimg.com", "img.youtube.com"]),
    embeddable: item.embeddable === true,
  };
}

function reel(value: unknown): InstagramReel | undefined {
  const item = record(value);
  if (typeof item?.id !== "string" || !/^[\w-]{5,24}$/.test(item.id)
    || typeof item.title !== "string" || !item.title.trim()) return undefined;
  return {
    id: item.id, title: item.title.slice(0, 128), topic: "Instagram Reel",
    thumbnail: thumbnail(item.thumbnail, ["cdninstagram.com", "fbcdn.net"]),
  };
}

function snapshot<T extends { id: string }>(value: unknown, parse: (value: unknown) => T | undefined, now: number) {
  const entry = record(value);
  if (typeof entry?.updatedAt !== "string" || !Array.isArray(entry.items) || entry.items.length > maxItems) return undefined;
  const age = now - Date.parse(entry.updatedAt);
  if (!(age >= 0 && age < cacheLifetime)) return undefined;
  const items = entry.items.map(parse).filter((item): item is T => item !== undefined);
  if (items.length !== entry.items.length || new Set(items.map((item) => item.id)).size !== items.length) return undefined;
  return { updatedAt: entry.updatedAt, items };
}

export function parseMediaFeed(value: unknown, now = Date.now()): MediaFeed | undefined {
  const feed = record(value);
  if (feed?.version !== 1) return undefined;
  return {
    youtube: snapshot(feed.youtube, video, now),
    instagram: snapshot(feed.instagram, reel, now),
  };
}

export function parseMediaRelease(value: unknown, now = Date.now()) {
  const release = record(value);
  if (release?.tag_name !== "media-feed" || release.prerelease !== true
    || typeof release.body !== "string" || release.body.length > 40000) return undefined;
  try {
    return parseMediaFeed(JSON.parse(release.body), now);
  } catch {
    return undefined;
  }
}
