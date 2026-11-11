"use client";

import { useEffect, useState } from "react";
import { parseMediaFeed, parseMediaRelease, type MediaFeed } from "./media-feed";

const feedUrl = "https://api.github.com/repos/nourabm33/gescard-akiki/releases/tags/media-feed";
const storageKey = "gescard-media-feed-v1";
const requestWindow = 5 * 60 * 1000;
let lastRequest: { startedAt: number; promise: Promise<MediaFeed | undefined> } | undefined;

function readCache() {
  try {
    return parseMediaFeed(JSON.parse(sessionStorage.getItem(storageKey) ?? "null"));
  } catch {
    return undefined;
  }
}

async function fetchFeed() {
  try {
    const response = await fetch(feedUrl, { credentials: "omit", signal: AbortSignal.timeout(8000) });
    if (!response.ok) return readCache();
    const feed = parseMediaRelease(await response.json());
    if (!feed) return readCache();
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ version: 1, ...feed }));
    } catch {
      // The feed remains usable in browsers with storage disabled.
    }
    return feed;
  } catch {
    return readCache();
  }
}

function getFeed() {
  const now = Date.now();
  if (!lastRequest || now - lastRequest.startedAt >= requestWindow) {
    lastRequest = { startedAt: now, promise: fetchFeed() };
  }
  return lastRequest.promise;
}

export function useMediaFeed() {
  const [feed, setFeed] = useState<MediaFeed>();
  useEffect(() => {
    let subscribed = true;
    getFeed().then((value) => {
      if (subscribed) setFeed(value);
    });
    return () => { subscribed = false; };
  }, []);
  return feed;
}
