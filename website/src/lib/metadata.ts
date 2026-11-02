import type { Metadata } from "next";
import { absoluteUrl } from "./site";
import { profile } from "@/data/profile";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
};

export function pageMetadata({ title, description, path, image = "/og-image.jpg", noIndex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${profile.name}`;
  const images = [{ url: absoluteUrl(image), width: 1200, height: 630, alt: `${profile.name}, ${profile.title}` }];
  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", url, title: fullTitle, description, siteName: `${profile.name} | Dubai Real Estate`, images, locale: "en_GB" },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: images.map((i) => i.url) },
    robots: noIndex ? { index: false, follow: true } : undefined,
  };
}
