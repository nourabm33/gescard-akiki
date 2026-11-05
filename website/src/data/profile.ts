/**
 * Personal profile, contact details and social links.
 * Everything here is client-supplied. Fields marked "verify" must be confirmed before publishing.
 */
export const profile = {
  name: "Gescard Akiki",
  brand: "GESCARD AKIKI",
  /** Public title used across the site. */
  title: "UAE Property Advisor",
  /**
   * Title from his social profile. Verify his current broker certification / registration
   * before using it on the site (then replace `title` above).
   */
  selfDescribedTitle: "Certified Senior Property Consultant",
  agency: {
    name: "RichKey Properties",
    /** Wording for his relationship with the agency (he is not the owner). */
    relationship: "Consultant with RichKey Properties",
  },
  email: "Gescard.a@richkey.ae",
  phone: { display: "+971 52 776 0240", e164: "+971527760240" },
  whatsapp: {
    display: "+971 52 776 0240",
    number: "971527760240",
    url: "https://wa.me/971527760240",
    defaultMessage: "Hello Gescard, I found your website and would like to discuss UAE real estate.",
  },
  address: {
    lines: ["Dubai Hills Business Park", "Building 4, 2nd Floor", "Dubai, UAE"],
    full: "Dubai Hills Business Park, Building 4, 2nd Floor, Dubai, UAE",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Dubai+Hills+Business+Park+Building+4+Dubai",
  },
  socials: {
    instagram: { label: "Instagram", handle: "@gescard.akiki", url: "https://www.instagram.com/gescard.akiki/" },
    youtube: {
      label: "YouTube",
      handle: "@gescardakikidubairealestate",
      url: "https://www.youtube.com/@gescardakikidubairealestate",
      subscribeUrl: "https://www.youtube.com/@gescardakikidubairealestate?sub_confirmation=1",
    },
  },
  /**
   * Full biography, one string per paragraph. Leave empty until Gescard supplies it;
   * the About page then shows only the general approach copy.
   */
  biography: [] as string[],
  /** Verified credentials only, e.g. { label: "Broker registration (BRN)", value: "12345" }. */
  credentials: [] as { label: string; value: string }[],
  /** Languages spoken, once confirmed. */
  languages: [] as string[],
} as const;

export type Profile = typeof profile;
