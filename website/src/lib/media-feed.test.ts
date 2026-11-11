import { describe, expect, it } from "vitest";
import { parseMediaRelease } from "./media-feed";

const now = Date.parse("2026-11-11T12:00:00Z");
const updatedAt = "2026-11-11T06:00:00Z";
const release = (body: object) => ({ tag_name: "media-feed", prerelease: true, body: JSON.stringify(body) });

describe("public media snapshot", () => {
  it("accepts independently refreshed sections and strips unapproved thumbnail URLs", () => {
    const result = parseMediaRelease(release({
      version: 1,
      youtube: { updatedAt, items: [{ id: "3GBvqaLy84I", title: "New upload", duration: "4:15", thumbnail: "https://i.ytimg.com/vi/3GBvqaLy84I/hqdefault.jpg", embeddable: false }] },
      instagram: { updatedAt, items: [{ id: "DfUPIG9RKjM", title: "New Reel", thumbnail: "https://scontent.cdninstagram.com/reel.jpg?access_token=secret" }] },
    }), now);
    expect(result?.youtube?.items[0]).toMatchObject({ title: "New upload", embeddable: false, thumbnail: expect.stringContaining("i.ytimg.com") });
    expect(result?.instagram?.items[0]).toMatchObject({ title: "New Reel", thumbnail: undefined });
  });

  it("distinguishes a confirmed empty list from missing or expired data", () => {
    const result = parseMediaRelease(release({
      version: 1,
      youtube: { updatedAt, items: [] },
      instagram: { updatedAt: "2026-10-01T00:00:00Z", items: [] },
    }), now);
    expect(result?.youtube?.items).toEqual([]);
    expect(result?.instagram).toBeUndefined();
    expect(parseMediaRelease({ ...release({}), body: "temporarily unavailable" }, now)).toBeUndefined();
  });
});
