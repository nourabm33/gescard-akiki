/**
 * Individual listings and editorial development profiles confirmed by Gescard.
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
  /** Project profile. Project-wide facts are kept separate from individual listings. */
  development?: {
    developer: string;
    tagline: string;
    homes: string;
    sources: { label: string; url: string }[];
  };
  shortDescription: string;
  description: string[];
  features: string[];
  /** Paths inside /public. The first image is the cover. */
  images: { src: string; alt: string }[];
};

export const properties: Property[] = [
  {
    slug: "marsa-al-saadiyat",
    title: "Marsa Al Saadiyat",
    location: "Saadiyat Island, Abu Dhabi",
    category: "Off-plan",
    featured: true,
    shortDescription: "Explore Talay and Talay Beach, Aldar’s first villa communities within the waterfront masterplan.",
    development: {
      developer: "Aldar",
      tagline: "Some locations simply cannot be replicated.",
      homes: "Talay & Talay Beach · 4–6 bedroom villas",
      sources: [
        { label: "Aldar · Talay and Talay Beach", url: "https://www.aldar.com/properties/en/uae/saadiyat-island/talay-marsa-al-saadiyat" },
        { label: "Aldar · Marsa Al Saadiyat masterplan", url: "https://www.aldar.com/properties/en/marsaalsaadiyat" },
        { label: "Saadiyat Cultural District · Visitor information", url: "https://partners.saadiyatculturaldistrict.ae/" },
        { label: "Abu Dhabi Media Office · Guggenheim opening announcement", url: "https://www.mediaoffice.abudhabi/en/arts-culture/department-of-culture-and-tourism-abu-dhabi-announces-opening-of-guggenheim-abu-dhabi-on-11-december-2026/" },
        { label: "Abu Dhabi Media Office · Saadiyat Turtle Patrol", url: "https://www.mediaoffice.abudhabi/en/environment/environment-agency-abu-dhabi-records-first-olive-ridley-turtle-nest-in-emirate/" },
      ],
    },
    description: [
      "Marsa Al Saadiyat is Aldar’s waterfront master development on Saadiyat Island. Its first residential launch comprises 351 standalone villas with four, five or six bedrooms across Talay and Talay Beach. Landscaped paths, gathering spaces and water features inspired by traditional aflaj shape the two communities.",
      "The island already brings together the galleries of Louvre Abu Dhabi, Zayed National Museum, Natural History Museum Abu Dhabi, teamLab Phenomena Abu Dhabi and the campus of NYU Abu Dhabi. Its turquoise shallows and beaches also support marine wildlife, including nesting sea turtles. Guggenheim Abu Dhabi has an announced opening date of 11 December 2026.",
      "A marina, a waterfront promenade, the Dar al Funoon Abu Dhabi performing arts venue and an underground Etihad Rail station are part of the announced Marsa Al Saadiyat masterplan. For Gescard, the lasting appeal is the combination of coastline, culture and education already present on the island.",
    ],
    features: ["351 standalone villas across two communities", "Four-, five- and six-bedroom layouts", "Planned landscaped green spine and outdoor majlis", "Community pools and children’s play areas"],
    images: [
      { src: "/images/properties/marsa-al-saadiyat/villa.webp", alt: "Aldar render of a Talay villa framed by gardens" },
      { src: "/images/properties/marsa-al-saadiyat/pool.webp", alt: "Aldar render of Talay’s landscaped community pool" },
      { src: "/images/properties/marsa-al-saadiyat/interior.webp", alt: "Aldar render of an open living and dining space at Talay" },
    ],
  },
  {
    slug: "palm-central",
    title: "Palm Central Private Residences",
    location: "Palm Jebel Ali, Dubai",
    category: "Off-plan",
    featured: true,
    shortDescription: "Nakheel’s stepped waterfront residences on the spine of Palm Jebel Ali.",
    development: {
      developer: "Nakheel",
      tagline: "A new chapter in Dubai’s waterfront living.",
      homes: "Apartments, townhouses & penthouses",
      sources: [
        { label: "Nakheel · Palm Central Private Residences", url: "https://www.nakheel.com/en/new-launches/palm-central-private-residences" },
        { label: "Nakheel · Palm Central next phase", url: "https://www.nakheel.com/en/media-centre/press-releases/news-detail/2026/06/24/nakheel-releases-next-phase-of-palm-central-private-residences-amid-accelerating-demand-for-beachfront-living-on-palm-jebel-ali" },
        { label: "Nakheel · Palm Jebel Ali villa collections", url: "https://www.nakheel.com/en/media-centre/press-releases/news-detail/2026/08/20/nakheel-unveils-limited-collection-of-44-beachfront-villas-on-palm-jebel-ali-s-frond-f" },
      ],
    },
    description: [
      "Palm Central Private Residences is Nakheel’s collection of coastal homes on the spine of Palm Jebel Ali. The architecture steps back to make room for terraces and long views across the water, with pools, landscaped outdoor spaces and fitness facilities in the development plan.",
      "The original Palm Central collection includes apartments, townhouses and penthouses. Nakheel’s next phase includes one- to four-bedroom apartments and four- to five-bedroom townhouses across three buildings.",
      "Across the wider Palm Jebel Ali master development, Nakheel’s Beach and Coral collections offer five-, six- and seven-bedroom frond villas as separate releases. Palm Jumeirah is an established reference point for Dubai’s island living. Gescard considers Palm Jebel Ali on its own merits, including how its homes, amenities and transport connections are delivered over time.",
    ],
    features: ["Coastal setting on the Palm Jebel Ali spine", "Stepped residences and expansive terraces", "Planned pools, sports courts and fitness spaces", "Home types vary by release"],
    images: [
      { src: "/images/properties/palm-central/aerial.webp", alt: "Nakheel aerial render of Palm Central’s stepped buildings beside a crescent beach" },
      { src: "/images/properties/palm-central/beachfront.webp", alt: "Nakheel render of Palm Central Private Residences from the beach" },
      { src: "/images/properties/palm-central/interior.webp", alt: "Nakheel render of a Palm Central living room overlooking the waterfront" },
    ],
  },
];

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
