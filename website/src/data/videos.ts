/** The pre-rendered selection used before the first successful API refresh. */
export type Video = { id: string; title: string; duration: string; thumbnail?: string; embeddable?: boolean };

export const longVideos: Video[] = [
  { id: "3GBvqaLy84I", title: "Expo city masterplan has a timeless value!", duration: "14:26" },
  { id: "aSj8hyUn8EA", title: "Springs 2.0 - FIRST OF MANY!", duration: "7:23" },
  { id: "qnVRccfgnLY", title: "Lunaya by Zaya after 23 years of Al barari!", duration: "12:23" },
];

export function videoUrl(video: Video) {
  return `https://www.youtube.com/watch?v=${video.id}`;
}

export function embedUrl(video: Video) {
  return `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`;
}

export function thumbnailUrl(video: Video) {
  return video.thumbnail ?? `https://i.ytimg.com/vi/${video.id}/hq720.jpg`;
}
