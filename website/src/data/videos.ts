/** The pre-rendered selection used before the first successful API refresh. */
export type Video = { id: string; title: string; duration: string; thumbnail?: string; embeddable?: boolean };

export const longVideos: Video[] = [
  { id: "uxT1huNKP1o", title: "Palm Central by Nakheel: Is This the Best Entry Into Palm Jebel Ali?", duration: "8:01" },
  { id: "C5peQk_7hd0", title: "SHIONE by BEYOND Revealed | Dubai Islands’ New Luxury Beachfront Development", duration: "6:00" },
  { id: "EcGciNzEp-Y", title: "Why Yas Point Canopies Could Outperform | Aldar’s Next Big Investment on Yas Island", duration: "4:29" },
  { id: "FvmsilmU1FA", title: "Apartments Next to Disney World on Yas Island | The Canopies at Yas Point by Aldar", duration: "6:16" },
  { id: "oifIDhC3yrQ", title: "Palm Springs Revealed | A New Waterfront Community in Dubai", duration: "4:34" },
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
