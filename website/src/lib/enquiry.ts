import { profile } from "../data/profile";

export const interestOptions = ["Property investment", "Apartment", "Villa", "Buying a home", "Other"] as const;
export const budgetOptions = [
  "Under AED 500,000",
  "AED 500,000–1,000,000",
  "AED 1,000,000–2,000,000",
  "AED 2,000,000–5,000,000",
  "Above AED 5,000,000",
  "Not decided yet",
] as const;

export type EnquiryInput = {
  name: string;
  email: string;
  phone: string;
  interest: string;
  budget: string;
  location: string;
  message: string;
  privacy: boolean;
  project?: string;
};

export type EnquiryErrors = Partial<Record<keyof EnquiryInput, string>>;

export const limits = { name: 80, email: 120, phone: 24, location: 80, message: 1200 } as const;

/** Removes control characters and markup brackets, collapses whitespace (keeps line breaks in messages). */
export function sanitize(value: string, maxLength: number, multiline = false): string {
  let v = value.normalize("NFC").replace(/[<>]/g, "");
  v = multiline
    ? v.replace(/[^\S\n]+/g, " ").replace(/[\u0000-\u0009\u000B-\u001F\u007F]/g, "").replace(/\n{3,}/g, "\n\n")
    : v.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ");
  return v.trim().slice(0, maxLength);
}

export function cleanEnquiry(input: EnquiryInput): EnquiryInput {
  return {
    name: sanitize(input.name, limits.name),
    email: sanitize(input.email, limits.email).toLowerCase(),
    phone: sanitize(input.phone, limits.phone),
    interest: (interestOptions as readonly string[]).includes(input.interest) ? input.interest : "",
    budget: (budgetOptions as readonly string[]).includes(input.budget) ? input.budget : "",
    location: sanitize(input.location, limits.location),
    message: sanitize(input.message, limits.message, true),
    privacy: input.privacy === true,
    project: sanitize(input.project ?? "", 120),
  };
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{6,24}$/;

export function validateEnquiry(raw: EnquiryInput): { data: EnquiryInput; errors: EnquiryErrors } {
  const data = cleanEnquiry(raw);
  const errors: EnquiryErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!data.email) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(data.email)) errors.email = "Please enter a valid email address.";
  if (data.phone) {
    const digits = data.phone.replace(/\D/g, "");
    if (!PHONE_RE.test(data.phone) || digits.length < 6 || digits.length > 15)
      errors.phone = "Please enter a valid phone number, including the country code.";
  }
  if (!data.privacy) errors.privacy = "Please confirm you have read the privacy policy.";
  return { data, errors };
}

export function enquiryText(d: EnquiryInput): string {
  const details: [string, string][] = [
    ["Name", d.name],
    ["Email", d.email],
    ["WhatsApp / phone", d.phone],
    ["Interested in", d.interest],
    ["Development", d.project ?? ""],
    ["Estimated budget", d.budget],
    ["Preferred location", d.location],
  ];
  const out = [
    "Hello Gescard, I'd like to make an enquiry via your website.",
    "",
    ...details.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`),
  ];
  if (d.message) out.push("", "Message:", d.message);
  return out.join("\n");
}

export function whatsappLink(text: string = profile.whatsapp.defaultMessage): string {
  return `${profile.whatsapp.url}?text=${encodeURIComponent(text)}`;
}

export function mailtoLink(subject: string, body?: string): string {
  const params = [`subject=${encodeURIComponent(subject)}`];
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${profile.email}?${params.join("&")}`;
}
