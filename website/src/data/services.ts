import type { ImageKey } from "@/lib/images";

/** Three highlight cards on the homepage. */
export const serviceHighlights: { title: string; text: string; href: string; image: ImageKey; alt: string }[] = [
  {
    title: "Property Investment",
    text: "Personalised property guidance based on individual investment objectives.",
    href: "/expertise/#investment",
    image: "stock/downtown-dubai",
    alt: "Downtown Dubai towers and the Burj Khalifa under a bright sky",
  },
  {
    title: "Apartments",
    text: "Explore residential opportunities across Dubai.",
    href: "/expertise/#homes",
    image: "stock/apartment-interior-illustrative",
    alt: "Bright, modern apartment living room (illustrative interior)",
  },
  {
    title: "Villas",
    text: "Discover properties suited to different lifestyles and preferences.",
    href: "/expertise/#homes",
    image: "stock/villa-illustrative",
    alt: "Contemporary white villa with a private pool (illustrative)",
  },
];

/** Service principles: presented as an approach, not as market claims. */
export const principles = [
  { title: "Personal Approach", text: "Understanding individual preferences and objectives." },
  { title: "Selective Opportunities", text: "Helping clients explore properties suited to their requirements." },
  { title: "Dedicated Guidance", text: "Direct communication throughout the property search process." },
];

/** Expertise page. Do not add mortgage, legal or property-management services unless confirmed. */
export const services: {
  id: string;
  number: string;
  label: string;
  title: string;
  text: string;
  cta: { label: string; href: string };
  image: ImageKey;
  alt: string;
}[] = [
  {
    id: "investment",
    number: "01",
    label: "Property Investment Guidance",
    title: "Explore Dubai Property Investment.",
    text: "Explore property opportunities in Dubai with a personalised approach to your investment objectives. Gescard can help you understand available options and develop a property search around your preferences and budget.",
    cta: { label: "Discuss your investment goals", href: "/contact/?interest=investment" },
    image: "stock/dubai-night-boulevard",
    alt: "Dubai skyscrapers along an illuminated boulevard at night",
  },
  {
    id: "homes",
    number: "02",
    label: "Apartments and Villas",
    title: "Find a Property That Feels Right.",
    text: "Explore apartments and villas across Dubai, with attention to location, property type, lifestyle preferences and individual requirements.",
    cta: { label: "Explore properties", href: "/properties/" },
    image: "stock/villa-garden-illustrative",
    alt: "Modern villa with garden and pool terrace (illustrative)",
  },
  {
    id: "search",
    number: "03",
    label: "Personalised Property Search",
    title: "A Property Search Built Around You.",
    text: "Every client has different requirements. Share your preferences, desired location and budget to begin a more personalised property search.",
    cta: { label: "Start your property search", href: "/contact/" },
    image: "stock/palm-jumeirah",
    alt: "Aerial view of Palm Jumeirah and the Arabian Gulf",
  },
];
