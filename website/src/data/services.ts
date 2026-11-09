import type { ImageKey } from "@/lib/images";

/** Three highlight cards on the homepage. */
export const serviceHighlights: { title: string; text: string; href: string; image: ImageKey; alt: string }[] = [
  {
    title: "Off-Plan Advisory",
    text: "Compare developers, payment schedules and delivery milestones.",
    href: "/expertise/#investment",
    image: "stock/downtown-dubai",
    alt: "Downtown Dubai towers and the Burj Khalifa under a bright sky",
  },
  {
    title: "Dubai & Abu Dhabi",
    text: "Compare neighbourhoods, from established districts to emerging waterfront communities.",
    href: "/expertise/#homes",
    image: "stock/burj-al-arab-coast",
    alt: "Dubai’s coast and Burj Al Arab",
  },
  {
    title: "Personal Guidance",
    text: "Build a shortlist around your budget, priorities and timing.",
    href: "/expertise/#search",
    image: "gescard/consultation",
    alt: "Gescard Akiki on a call at his office",
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
    label: "Off-Plan Advisory",
    title: "Understand what you’re buying.",
    text: "Gescard helps you compare off-plan opportunities from developers such as Emaar, Aldar and Nakheel, part of Dubai Holding Real Estate. He looks at the developer, payment schedule, delivery milestones and the location before building a shortlist.",
    cta: { label: "Discuss your investment goals", href: "/contact/?interest=investment" },
    image: "stock/dubai-night-boulevard",
    alt: "Dubai skyscrapers along an illuminated boulevard at night",
  },
  {
    id: "homes",
    number: "02",
    label: "Dubai & Abu Dhabi",
    title: "Start with the location.",
    text: "A home on a developing waterfront comes with a different timeline from one in an established district. Gescard helps you compare what each location offers today and what is planned, including schools, transport and everyday amenities.",
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
    image: "gescard/consultation",
    alt: "Gescard Akiki discussing property options by phone",
  },
];
