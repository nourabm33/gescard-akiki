/**
 * YouTube videos from https://www.youtube.com/@gescardakikidubairealestate
 * Titles are copied exactly from the channel. To add a video, paste its ID
 * (the part after "watch?v=" or "/shorts/") and its title at the top of the list.
 *
 * format: "video" for regular landscape videos, "short" for YouTube Shorts (vertical).
 */
export type Video = { id: string; title: string; format: "video" | "short"; publishedAt: string };

export const videos: Video[] = [
  { id: "85C-TfhOV6c", title: "Palm springs plot🌴 it’s insane and huge🤩", format: "short", publishedAt: "2026-11-01" },
  { id: "aSj8hyUn8EA", title: "Springs 2.0 - FIRST OF MANY!", format: "video", publishedAt: "2026-10-31" },
  { id: "qnVRccfgnLY", title: "Lunaya by Zaya after 23 years of Al barari!", format: "video", publishedAt: "2026-10-27" },
  { id: "dLu5RQ-Gxro", title: "What is happening in Expo city?", format: "short", publishedAt: "2026-06-19" },
  { id: "bmnIoiGiAJs", title: "palm central phase 2!", format: "short", publishedAt: "2026-06-13" },
  { id: "yWKPFazKYh4", title: "This is one of the safest if not the safest masterplan to enter in dubai right now.", format: "short", publishedAt: "2026-06-08" },
  { id: "WFYxj5g2eiw", title: "8 June 2026", format: "short", publishedAt: "2026-06-08" },
  { id: "KmDjfy9Q-G8", title: "While panic sellers flood the market, my investors didn’t even flinch.", format: "short", publishedAt: "2026-05-21" },
  { id: "QRaFIjq56MY", title: "Real estate is not crypto,Stop treating it like it is!", format: "short", publishedAt: "2026-01-19" },
  { id: "Nr25Mx-Q1H8", title: "You don’t need to be in Dubai yo invest in a property!", format: "short", publishedAt: "2026-01-09" },
];

export const longVideos = videos.filter((v) => v.format === "video");
export const shortVideos = videos.filter((v) => v.format === "short");

export function videoUrl(v: Video) {
  return v.format === "short" ? `https://www.youtube.com/shorts/${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
}

/** Privacy-enhanced embed; only loaded after the visitor presses play. */
export function embedUrl(v: Video) {
  return `https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
}

export function thumbnailUrl(v: Video) {
  return v.format === "short" ? `https://i.ytimg.com/vi/${v.id}/oar2.jpg` : `https://i.ytimg.com/vi/${v.id}/maxresdefault.jpg`;
}

/** Title without emoji, for elegant display (the original stays in `title`). */
export function displayTitle(v: Video) {
  return v.title.replace(/\p{Extended_Pictographic}|\uFE0F/gu, " ").replace(/\s+/g, " ").trim();
}
