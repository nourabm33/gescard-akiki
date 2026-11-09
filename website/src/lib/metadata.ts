import type { Metadata } from "next";
import { absoluteUrl } from "./site";
import { profile } from "@/data/profile";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, image = "/og-image.jpg", imageAlt = `${profile.name}, ${profile.title}`, noIndex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${profile.name}`;
  const images = [{ url: absoluteUrl(image), alt: imageAlt, ...(image === "/og-image.jpg" ? { width: 1200, height: 630 } : {}) }];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: fullTitle, description, siteName: `${profile.name} | UAE Real Estate`, images, locale: "en_GB" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
