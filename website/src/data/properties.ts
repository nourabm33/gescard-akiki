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
export type PropertyImage = { src: string; alt: string; previewSrc?: string; thumbnailSrc?: string };

function projectRender(slug: string, filename: string, alt: string): PropertyImage {
  const path = `/images/properties/${slug}/${filename}`;
  return { src: `${path}.webp`, previewSrc: `${path}-preview.webp`, thumbnailSrc: `${path}-thumb.webp`, alt };
}

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
    /** Prefilled WhatsApp/email enquiry. Defaults to a generic message. */
    enquiry?: string;
    /** Approximate headline figures from official sources. */
    facts?: { value: string; label: string }[];
    /** Extra storytelling sections shown after the overview. */
    sections?: { title: string; intro?: string; items?: { title: string; text: string }[] }[];
    sources: { label: string; url: string }[];
  };
  shortDescription: string;
  description: string[];
  features: string[];
  /** Paths inside /public. The first image is the cover. */
  images: PropertyImage[];
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
  {
    slug: "palm-springs",
    title: "Palm Springs",
    location: "Southern Dubai, beside Palm Jebel Ali",
    category: "Off-plan",
    featured: true,
    shortDescription: "Nakheel’s master-planned community of villas and townhouses, connected by parkland, clubs and everyday essentials.",
    development: {
      developer: "Nakheel",
      tagline: "Where life comes together.",
      homes: "Aliso Townhouses & Rancho Villas · 3–5 bedrooms",
      enquiry: "Hi Gescard, I'm interested in Palm Springs by Nakheel and would like to know more about the available residences.",
      facts: [
        { value: "3.8M sq m", label: "Masterplan" },
        { value: "~50,000", label: "Planned residents" },
        { value: "15", label: "Neighbourhoods" },
        { value: "35+ km", label: "Cycling & walking routes" },
      ],
      sections: [
        {
          title: "Three signature destinations",
          items: [
            { title: "Canyon Park", text: "The green heart of the community: pathways through sensory gardens and open lawns, beside streams, ponds and gentle waterfalls, with shallow pools and small sandy beaches for families to explore." },
            { title: "Thousand Palms Country Club", text: "Dining, wellness and leisure in a landscaped setting, planned with a beach-inspired pool, kids’ pools and splash pads, a gym, restaurants and an event lawn." },
            { title: "Silver Spur Racquet Club", text: "The community’s sports destination, with courts, a gym and a pool for early matches, midday workouts and evening swims." },
          ],
        },
        {
          title: "Two residential collections",
          intro: "Indicative sizes are taken from Nakheel’s factsheet and may vary by release.",
          items: [
            { title: "Aliso Townhouses", text: "Three- and four-bedroom townhouses with private gardens and walkable streets leading to nearby parks. Approximately 2,326 to 3,115 sq ft." },
            { title: "Rancho Villas", text: "Four- and five-bedroom standalone villas whose living areas open onto private gardens, courtyards and pools, with en-suite bedrooms. Approximately 4,041 to 4,921 sq ft." },
          ],
        },
        {
          title: "Thoughtfully planned for tomorrow",
          intro: "Palm Springs has been awarded LEED for Communities Platinum Precertification. Nakheel’s masterplan integrates water, energy and waste solutions, climate-responsive landscaping and shaded corridors for everyday outdoor movement. Precertification recognises the plan; it is not a final certification of the completed community.",
        },
      ],
      sources: [
        { label: "Nakheel · Palm Springs", url: "https://www.nakheel.com/en/new-launches/palm-springs" },
        { label: "Dubai Holding · Nakheel unveils Palm Springs", url: "https://www.dubaiholding.com/en/media-hub/press-releases/nakheel-unveils-palm-springs-a-new-sustainable-community-beside-palm-jebel-ali" },
      ],
    },
    description: [
      "Palm Springs is Nakheel’s new residential masterplan in southern Dubai, set beside Palm Jebel Ali rather than on the island itself. It covers about 3.8 million square metres and is planned for almost 50,000 residents across 15 neighbourhoods, with homes, schools, healthcare, sport and leisure planned together from the outset.",
      "Canyon Park runs through the community as a continuous landscape. Around it, Nakheel plans approximately 593,000 square metres of open space and more than 35 km of cycling, jogging and walking routes linking the neighbourhoods with parks, retail and leisure destinations.",
      "Nakheel puts the community about 14 minutes from Palm Jebel Ali and 23 minutes from Al Maktoum International Airport (DWC). The facilities described here are planned and will be delivered as the district develops.",
    ],
    features: ["Two planned schools and a hospital", "Six planned mosques", "Planned retail and cultural venues", "Country Club and Racquet Club", "Approx. 593,000 sq m of open space", "35+ km of cycling, jogging and walking routes"],
    images: [
      { src: "/images/properties/palm-springs/canyon-park.webp", alt: "Nakheel render of Canyon Park’s waterways, fountains and landscaped pools at Palm Springs" },
      { src: "/images/properties/palm-springs/country-club.webp", alt: "Nakheel render of the Thousand Palms Country Club pool at dusk, framed by palms" },
      { src: "/images/properties/palm-springs/rancho-villa.webp", alt: "Nakheel render of five-bedroom Rancho villas along a landscaped path" },
      { src: "/images/properties/palm-springs/villa-living.webp", alt: "Nakheel render of a Rancho villa living and dining room opening onto the garden" },
      { src: "/images/properties/palm-springs/aliso-townhouse.webp", alt: "Nakheel render of an Aliso four-plex townhouse street" },
    ],
  },
  {
    slug: "mareva-the-oasis",
    title: "Marèva at The Oasis",
    location: "The Oasis, Dubai",
    category: "Off-plan",
    featured: true,
    shortDescription: "Emaar’s Marèva and Marèva 2 villa collections are planned around the lagoons and landscaped paths of The Oasis.",
    development: {
      developer: "Emaar",
      tagline: "Villas shaped around the lagoon.",
      homes: "Marèva & Marèva 2 · 4–6 bedroom villas",
      enquiry: "Hi Gescard, I’m interested in Marèva at The Oasis and would like to know more about the available villas.",
      facts: [
        { label: "Villa layouts", value: "4–6 bedrooms" },
        { label: "Collections", value: "Marèva & Marèva 2" },
      ],
      sections: [
        {
          title: "Life at The Oasis",
          items: [
            { title: "Lagoon and pools", text: "The plans include a swimmable lagoon, beaches and pools with paths along the water." },
            { title: "Parks and movement", text: "Pocket parks, playgrounds, jogging and cycling tracks, and sports courts are part of the wider community plan." },
            { title: "Everyday amenities", text: "Emaar’s brochure includes retail centres, a community centre, a clubhouse, schools and wellness facilities." },
          ],
        },
      ],
      sources: [
        { label: "Emaar · Marèva at The Oasis", url: "https://www.emaar.com/en/properties/mareva-at-the-oasis" },
        { label: "Emaar · Marèva 2 at The Oasis", url: "https://www.emaar.com/en/properties/mareva-2-at-the-oasis" },
      ],
    },
    description: [
      "Marèva and Marèva 2 are two Emaar villa collections within The Oasis in Dubai. The community is planned around waterways, landscaped paths and a swimmable lagoon, with homes that open onto terraces and gardens.",
      "Both collections include four-, five- and six-bedroom villas. The brochure shows contemporary façades, generous glazing and interiors in warm neutral tones. Ask Gescard to confirm the floor area, handover schedule and availability for a particular home.",
    ],
    features: ["Four-, five- and six-bedroom villas", "Planned swimmable lagoon and pools", "Landscaped walking, jogging and cycling routes", "Planned sports, wellness and clubhouse facilities"],
    images: [
      projectRender("mareva-the-oasis", "villa", "Emaar render of a villa at Marèva with a landscaped garden and pool"),
      projectRender("mareva-the-oasis", "lagoon", "Emaar render of the planned swimmable lagoon and waterfront path at The Oasis"),
      projectRender("mareva-the-oasis", "interior", "Emaar render of an open living room at Marèva overlooking the garden"),
      projectRender("mareva-the-oasis", "mareva-2-villa", "Emaar render of a three-level Marèva 2 villa and pool at dusk"),
    ],
  },
  {
    slug: "dubai-design-district",
    title: "Dubai Design District (d3)",
    location: "Dubai Water Canal, Dubai",
    category: "Off-plan",
    featured: true,
    shortDescription: "Meraas’s mixed-use masterplan extends the established design district into a walkable waterfront neighbourhood.",
    development: {
      developer: "Meraas",
      tagline: "A creative district on the water.",
      homes: "Mixed-use masterplan · Apartment and penthouse releases",
      enquiry: "Hi Gescard, I’m interested in Dubai Design District and would like to know more about the residential releases.",
      facts: [
        { label: "Masterplan area", value: "Approx. 18M sq ft" },
        { label: "Planned Design Line", value: "6 km" },
        { label: "Distinct areas", value: "5" },
        { label: "Certification target", value: "LEED Silver" },
      ],
      sections: [
        {
          title: "Five areas, one Design Line",
          intro: "The planned car-free Design Line connects the district’s five areas through landscaped walking routes and public spaces.",
          items: [
            { title: "The Creekside", text: "Canal-front residences and a promenade with planned leisure and waterfront facilities." },
            { title: "Design HQ", text: "Studios, creative workplaces and street-level retail extend the established design district." },
            { title: "Soho", text: "A social and cultural quarter planned around public squares, dining and performance spaces." },
            { title: "The Sanctuary", text: "A residential area with landscaped courtyards, parks, sports and play spaces." },
            { title: "The Mindspace", text: "Flexible studios, exhibition space and workspaces for making and collaboration." },
          ],
        },
        {
          title: "Residential releases",
          intro: "The brochure profiles The Edit at d3, Atélis at d3 and Design Quarter at d3. Unit sizes and completion dates apply to the individual releases.",
          items: [
            { title: "The Edit at d3", text: "One- to four-bedroom apartments and penthouses across three towers. One published one-bedroom floor plan measures approximately 755 sq ft in total, including its balcony." },
            { title: "Atélis at d3", text: "A Creekside tower designed by SOM. The developer’s floor plans show selected two-bedroom layouts of approximately 1,414–1,419 sq ft in total, including balconies." },
            { title: "Design Quarter at d3", text: "A separate apartment development within the creative district, with its own floor plans and specifications." },
          ],
        },
      ],
      sources: [
        { label: "Meraas · Dubai Design District masterplan", url: "https://meraas.com/en/master-development/d3" },
        { label: "Meraas · Masterplan announcement", url: "https://meraas.com/en/latest-post/news/meraas-unveils-18-million-sq-ft-residential-vision-d3-anchored-waterfront" },
        { label: "Meraas · The Edit at d3", url: "https://meraas.com/en/the-edit-at-d3" },
        { label: "Meraas · The Edit floor plans", url: "https://meraas.com/sites/default/files/2025-11/The%20Edit%20at%20d3%20FloorPlans.pdf" },
        { label: "Meraas · Atélis floor plans", url: "https://meraas.com/sites/default/files/2025-04/Atelis_at_D3_Floor%20Plans.pdf" },
      ],
    },
    description: [
      "Meraas’s expansion of Dubai Design District adds a residential waterfront to the existing design, art and fashion hub near Business Bay and Downtown Dubai. The masterplan brings homes, creative workspaces, cultural venues, retail and hospitality together along the Dubai Water Canal.",
      "The plans prioritise walking and include public art, sports facilities, landscaped parks and links to the waterfront. Meraas is targeting LEED Silver community certification, with an emphasis on sustainable mobility and energy-efficient design. The masterplan’s amenities are planned and the residential releases each have their own schedules.",
    ],
    features: ["Planned six-kilometre pedestrian Design Line", "Canal promenade and public spaces", "Creative studios, galleries and performance venues", "Planned parks, sports and play facilities"],
    images: [
      projectRender("dubai-design-district", "masterplan", "Meraas aerial render of the Dubai Design District masterplan and its canal-front skyline"),
      projectRender("dubai-design-district", "daytime-aerial", "Meraas daytime aerial render showing the five areas of Dubai Design District beside the canal"),
      projectRender("dubai-design-district", "creekside", "Meraas render of the Creekside waterfront buildings along Dubai Water Canal"),
      projectRender("dubai-design-district", "soho", "Meraas render of Soho’s public square and surrounding buildings at dusk"),
      projectRender("dubai-design-district", "sanctuary", "Meraas render of the Sanctuary landscape and raised path at sunset"),
    ],
  },
];

export function getProperty(slug: string) {
  return properties.find((p) => p.slug === slug);
}

export function getFeaturedProperties() {
  const featured = properties.filter((p) => p.featured);
  return featured.length ? featured : properties;
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
