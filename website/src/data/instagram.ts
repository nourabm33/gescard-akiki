import type { ImageKey } from "@/lib/images";

/**
 * Manually managed Instagram highlights (no live feed / scraping).
 * Use only images Gescard has supplied or authorised. Each tile links to his profile
 * (or set `url` to a specific post).
 */
export const instagramPosts: { image: ImageKey; alt: string; url?: string }[] = [
  { image: "gescard/gescard-portrait", alt: "Gescard Akiki at the Emaar Quarter 1 Broker Awards 2026" },
  { image: "gescard/emaar-awards-duo", alt: "Gescard Akiki with a RichKey Properties colleague at the Emaar Quarter 1 Broker Awards 2026" },
  { image: "gescard/emaar-awards-team-stage", alt: "The RichKey Properties team on stage at the Emaar Quarter 1 Broker Awards 2026" },
  { image: "gescard/emaar-awards-team-group", alt: "Gescard Akiki and the RichKey Properties team at the Emaar Quarter 1 Broker Awards 2026" },
];
