import type { MetadataRoute } from "next";
import { properties } from "@/data/properties";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/about/", "/expertise/", "/properties/", "/insights/", "/contact/", "/privacy-policy/", "/terms/"];
  return [
    ...pages.map((p) => ({ url: absoluteUrl(p), changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.7 })),
    ...properties.map((p) => ({ url: absoluteUrl(`/properties/${p.slug}/`), changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
