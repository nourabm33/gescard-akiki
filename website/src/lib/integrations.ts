const endpoint = process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT ?? "";
const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export const enquiryIntegration = /^(?:https:\/\/[a-z0-9.-]+|http:\/\/127\.0\.0\.1:\d+)\/enquiry$/.test(endpoint)
  && /^[a-zA-Z0-9_-]{10,120}$/.test(turnstileSiteKey) ? { endpoint, turnstileSiteKey } : undefined;

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "";
export const analyticsId = /^G-[A-Z0-9]{6,16}$/.test(measurementId) ? measurementId : "";
