import { analyticsId } from "./integrations";

type AnalyticsWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...command: unknown[]) => void;
};

const preferenceKey = "gescard-analytics-v1";
const preferenceEvent = "gescard:privacy-preferences";
const lifetime = 180 * 24 * 60 * 60 * 1000;
const denied = { analytics_storage: "denied", ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" };
export type Consent = "accepted" | "declined";
type EventName = "page_view" | "project_view" | "consultation_click" | "project_enquiry_click"
  | "whatsapp_click" | "telephone_click" | "email_click" | "gallery_interaction"
  | "youtube_outbound" | "instagram_outbound" | "generate_lead";

let enabled = false;
let configured = false;
let lastPath = "";

export function getConsent(): Consent | undefined {
  try {
    const value = JSON.parse(localStorage.getItem(preferenceKey) ?? "null");
    const age = Date.now() - value?.date;
    if (age >= 0 && age < lifetime && (value.choice === "accepted" || value.choice === "declined")) return value.choice;
  } catch {
    // Analytics stays disabled if preferences cannot be read.
  }
}

export function saveConsent(choice: Consent) {
  try {
    localStorage.setItem(preferenceKey, JSON.stringify({ choice, date: Date.now() }));
  } catch {
    // Use the choice for the current session when storage is unavailable.
  }
}

export function showPrivacyPreferences() {
  window.dispatchEvent(new Event(preferenceEvent));
}

export function onPrivacyPreferences(open: () => void) {
  window.addEventListener(preferenceEvent, open);
  return () => window.removeEventListener(preferenceEvent, open);
}

function pageContext(path: string) {
  let referrer = "";
  try { referrer = new URL(document.referrer).origin; } catch { /* Direct visit. */ }
  return { page_location: new URL(path, window.location.origin).href, page_referrer: referrer };
}

export function enableAnalytics() {
  if (!analyticsId) return;
  const browser = window as AnalyticsWindow;
  Reflect.set(browser, `ga-disable-${analyticsId}`, false);
  enabled = true;
  const granted = { ...denied, analytics_storage: "granted" };
  if (configured) {
    browser.gtag?.("consent", "update", granted);
    return;
  }
  configured = true;
  const queue = browser.dataLayer ??= [];
  // eslint-disable-next-line prefer-rest-params -- Use the Google tag command queue format.
  browser.gtag = function () { queue.push(arguments); };
  browser.gtag("consent", "default", denied);
  browser.gtag("consent", "update", granted);
  browser.gtag("js", new Date());
  browser.gtag("set", pageContext(location.pathname));
  browser.gtag("config", analyticsId, {
    send_page_view: false, allow_google_signals: false, allow_ad_personalization_signals: false,
    cookie_expires: lifetime / 1000, cookie_update: false,
  });
  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsId}`;
  script.async = true;
  document.head.append(script);
}

export function disableAnalytics() {
  enabled = false;
  lastPath = "";
  const browser = window as AnalyticsWindow;
  Reflect.set(browser, `ga-disable-${analyticsId}`, true);
  if (configured) browser.gtag?.("consent", "update", denied);
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (!/^_ga(?:_[A-Z0-9]+)?$/.test(name)) continue;
    document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`;
    if (location.hostname === "gescardakiki.com") {
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=gescardakiki.com; SameSite=Lax`;
    }
  }
}

function projectFromPath(path: string) {
  return /^\/properties\/([a-z0-9-]+)\/?$/.exec(path)?.[1];
}

export function track(event: EventName, parameters: Record<string, string> = {}) {
  if (!enabled) return;
  (window as AnalyticsWindow).gtag?.("event", event, {
    ...pageContext(location.pathname), ...parameters, send_to: analyticsId,
  });
}

export function trackPage(path: string) {
  if (!enabled || path === lastPath) return;
  lastPath = path;
  (window as AnalyticsWindow).gtag?.("set", pageContext(path));
  track("page_view");
  const project = projectFromPath(path);
  if (project) track("project_view", { project_slug: project });
}

export function trackLink(anchor: HTMLAnchorElement) {
  if (!enabled) return;
  const url = new URL(anchor.href);
  const project = projectFromPath(location.pathname);
  const dimensions: Record<string, string> = project ? { project_slug: project } : {};
  if (url.protocol === "tel:") track("telephone_click", dimensions);
  else if (url.protocol === "mailto:") track("email_click", dimensions);
  else if (url.hostname === "wa.me") track("whatsapp_click", dimensions);
  else if (["www.youtube.com", "youtube.com", "youtu.be"].includes(url.hostname)) track("youtube_outbound", dimensions);
  else if (["www.instagram.com", "instagram.com"].includes(url.hostname)) track("instagram_outbound", dimensions);
  else if (url.origin === location.origin && /^\/contact\/?$/.test(url.pathname)) track("consultation_click", dimensions);
  if (project && anchor.dataset.projectEnquiry) {
    track("project_enquiry_click", { project_slug: project, channel: anchor.dataset.projectEnquiry });
  }
}
