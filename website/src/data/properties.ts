/**
 * Property listings. Only add genuine listings supplied and confirmed by Gescard.
 *
 * To add a listing:
 * 1. Put its photos in public/images/properties/<slug>/ (e.g. 01.jpg, 02.jpg …, ideally WebP/JPG ≤ 2000px wide).
 * 2. Add an object to `properties` below (see the example in the comment).
 * 3. Run `npm run export` from /website and commit the result.
 *
 * Example:
 * {
 *   slug: "dubai-hills-2-bedroom-apartment",
 *   title: "Two-Bedroom Apartment, Dubai Hills Estate",
 *   location: "Dubai Hills Estate, Dubai",
 *   category: "Apartment",
 *   priceAED: 2150000,
 *   bedrooms: 2,
 *   bathrooms: 3,
 *   sizeSqft: 1250,
 *   status: "available",
 *   statusConfirmed: true,
 *   featured: true,
 *   shortDescription: "Bright corner unit with park views.",
 *   description: ["Paragraph one…", "Paragraph two…"],
 *   features: ["Balcony", "Covered parking", "Pool and gym"],
 *   images: [{ src: "/images/properties/dubai-hills-2-bedroom-apartment/01.jpg", alt: "Living room with park view" }],
 * },
 */

export type PropertyCategory = "Apartment" | "Villa" | "Townhouse" | "Penthouse" | "Plot" | "Off-plan" | "Other";
export type PropertyStatus = "available" | "reserved" | "sold";

export type Property = {
  slug: string;
  title: string;
  location: string;
  category: PropertyCategory;
  /** Price in AED. Leave undefined to show "Price on request". */
  priceAED?: number;
  bedrooms?: number;
  bathrooms?: number;
  sizeSqft?: number;
  status?: PropertyStatus;
  /** The status badge is shown only when this is true. */
  statusConfirmed?: boolean;
  featured?: boolean;
  shortDescription: string;
  description: string[];
  features: string[];
  /** Paths inside /public. The first image is the cover. */
  images: { src: string; alt: string }[];
};

export const properties: Property[] = [];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties(limit = 3) {
  const featured = properties.filter((p) => p.featured);
  return (featured.length ? featured : properties).slice(0, limit);
}

export function getSimilarProperties(property: Property, limit = 3) {
  return properties
    .filter((p) => p.slug !== property.slug)
    .sort((a, b) => Number(b.category === property.category) - Number(a.category === property.category))
    .slice(0, limit);
}

export function formatAED(value?: number) {
  if (value === undefined) return "Price on request";
  return `AED ${value.toLocaleString("en-US")}`;
}

export const statusLabels: Record<PropertyStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};
