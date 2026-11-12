export const cinematicClips = {
  arrival: { stem: "arrival" },
  "lobby-walk": { stem: "lobby-walk" },
  "city-walk": { stem: "city-walk" },
  "award-stage": { stem: "award-stage" },
  "award-moment": { stem: "award-moment" },
  "team-awards": { stem: "team-awards" },
} as const;

export type CinematicClip = keyof typeof cinematicClips;

export function cinematicVideoFile(clip: CinematicClip, mobile: boolean) {
  return `${cinematicClips[clip].stem}${mobile ? "-mobile" : ""}.mp4`;
}

export function cinematicPosterFile(clip: CinematicClip, width: 480 | 960) {
  return `${cinematicClips[clip].stem}-${width}.webp`;
}
