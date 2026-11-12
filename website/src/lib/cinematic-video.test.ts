import { describe, expect, it } from "vitest";
import { cinematicClips, cinematicPosterFile, cinematicVideoFile } from "./cinematic-video";

describe("cinematic video assets", () => {
  it("defines a mobile and desktop MP4 plus responsive posters for each clip", () => {
    for (const clip of Object.keys(cinematicClips) as Array<keyof typeof cinematicClips>) {
      expect(cinematicVideoFile(clip, false)).toMatch(/\.mp4$/);
      expect(cinematicVideoFile(clip, true)).toMatch(/-mobile\.mp4$/);
      expect(cinematicPosterFile(clip, 480)).toMatch(/-480\.webp$/);
      expect(cinematicPosterFile(clip, 960)).toMatch(/-960\.webp$/);
    }
  });

  it("keeps desktop and mobile video variants separate", () => {
    expect(cinematicVideoFile("arrival", false)).toBe("arrival.mp4");
    expect(cinematicVideoFile("arrival", true)).toBe("arrival-mobile.mp4");
  });
});
