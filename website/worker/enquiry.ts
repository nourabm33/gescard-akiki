import { enquiryText, validateEnquiry, type EnquiryInput } from "../src/lib/enquiry";

export type EnquiryEnv = {
  ALLOWED_ORIGIN: string;
  RECIPIENT: string;
  SENDER: string;
  TURNSTILE_SECRET: string;
  RESEND_API_KEY: string;
  ENQUIRY_RATE_LIMIT: { limit(input: { key: string }): Promise<{ success: boolean }> };
};

const maxBytes = 8192;
const tokenEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const mailEndpoint = "https://api.resend.com/emails";
const fields = ["name", "email", "phone", "interest", "budget", "location", "message", "project"] as const;

async function readEnquiry(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("Missing body");
  const decoder = new TextDecoder("utf-8", { fatal: true });
  let bytes = 0;
  let json = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    bytes += value.byteLength;
    if (bytes > maxBytes) {
      await reader.cancel();
      throw new Error("Body too large");
    }
    json += decoder.decode(value, { stream: true });
  }
  return JSON.parse(json + decoder.decode()) as unknown;
}

function parseEnquiry(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return;
  const input = body as Record<string, unknown>;
  if (typeof input.token !== "string" || !input.token || input.token.length > 2048
    || typeof input.requestId !== "string" || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/.test(input.requestId)
    || input.website !== "" || typeof input.privacy !== "boolean"
    || !fields.every((field) => typeof input[field] === "string")) return;
  const enquiry = Object.fromEntries(fields.map((field) => [field, input[field]])) as Omit<EnquiryInput, "privacy">;
  return { enquiry: { ...enquiry, privacy: input.privacy }, token: input.token, requestId: input.requestId };
}

export async function handleEnquiry(request: Request, env: EnquiryEnv, fetcher = fetch): Promise<Response> {
  const headers = new Headers({ "Cache-Control": "no-store", "Vary": "Origin" });
  const reply = (status: number, body: object) => Response.json(body, { status, headers });
  if (new URL(request.url).pathname !== "/enquiry") return reply(404, { error: "not_found" });
  if (request.headers.get("Origin") !== env.ALLOWED_ORIGIN) return reply(403, { error: "origin" });
  headers.set("Access-Control-Allow-Origin", env.ALLOWED_ORIGIN);
  headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  headers.set("Access-Control-Allow-Headers", "Content-Type");
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });
  if (request.method !== "POST") return reply(405, { error: "method" });
  if (request.headers.get("Content-Type")?.split(";")[0] !== "application/json") return reply(415, { error: "content_type" });
  if (!env.TURNSTILE_SECRET || !env.RESEND_API_KEY || !env.RECIPIENT || !env.SENDER) {
    return reply(503, { error: "unavailable" });
  }

  try {
    const ip = request.headers.get("CF-Connecting-IP");
    if (!ip) return reply(403, { error: "client" });
    const rate = await env.ENQUIRY_RATE_LIMIT.limit({ key: ip });
    if (!rate.success) return reply(429, { error: "rate" });
    const body = await readEnquiry(request).catch(() => null);
    const parsed = parseEnquiry(body);
    if (!parsed) return reply(400, { error: "input" });
    const { data, errors } = validateEnquiry(parsed.enquiry);
    if (Object.keys(errors).length) return reply(422, { error: "input", fields: errors });

    const verification = await fetcher(tokenEndpoint, {
      method: "POST",
      body: new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: parsed.token, remoteip: ip }),
      signal: AbortSignal.timeout(7000),
    });
    if (!verification.ok) return reply(503, { error: "unavailable" });
    const check = await verification.json();
    if (check.success !== true || check.action !== "enquiry" || check.hostname !== new URL(env.ALLOWED_ORIGIN).hostname) {
      return reply(400, { error: "verification" });
    }

    const sent = await fetcher(mailEndpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `enquiry/${parsed.requestId}`,
      },
      body: JSON.stringify({
        from: env.SENDER,
        to: [env.RECIPIENT],
        reply_to: data.email,
        subject: "New property enquiry from gescardakiki.com",
        text: enquiryText(data),
      }),
      signal: AbortSignal.timeout(9000),
    });
    if (!sent.ok) return reply(502, { error: "delivery" });
    const confirmation = await sent.json();
    if (typeof confirmation.id !== "string" || !confirmation.id) return reply(502, { error: "delivery" });
    return reply(200, { accepted: true });
  } catch {
    return reply(503, { error: "unavailable" });
  }
}

export default { fetch: (request: Request, env: EnquiryEnv) => handleEnquiry(request, env) };
