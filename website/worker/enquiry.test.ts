import { describe, expect, it, vi } from "vitest";
import { handleEnquiry, type EnquiryEnv } from "./enquiry";

const origin = "https://gescardakiki.com";
const env: EnquiryEnv = {
  ALLOWED_ORIGIN: origin, SENDER: "site@example.com", RECIPIENT: "adviser@example.com",
  TURNSTILE_SECRET: "fixture-only", RESEND_API_KEY: "fixture-only",
  ENQUIRY_RATE_LIMIT: { limit: async () => ({ success: true }) },
};
const valid = {
  name: "Test Visitor", email: "visitor@example.com", phone: "", interest: "Villa", budget: "",
  location: "", project: "Marèva at The Oasis", message: "Can we compare villa collections?",
  privacy: true, token: "verified-fixture", website: "", requestId: "1a000000-0000-4000-9000-000000000001",
};

function request(changes: Record<string, unknown> = {}, from = origin) {
  return new Request("https://enquiries.example.com/enquiry", {
    method: "POST",
    headers: { Origin: from, "Content-Type": "application/json", "CF-Connecting-IP": "192.0.2.1" },
    body: JSON.stringify({ ...valid, ...changes }),
  });
}

function providers(mailStatus = 200, hostname = "gescardakiki.com") {
  return vi.fn<typeof fetch>()
    .mockResolvedValueOnce(Response.json({ success: true, action: "enquiry", hostname }))
    .mockResolvedValueOnce(Response.json({ id: "accepted-by-test-provider" }, { status: mailStatus }));
}

describe("enquiry worker", () => {
  it("accepts a validated enquiry only after both providers succeed", async () => {
    const fetcher = providers();
    const response = await handleEnquiry(request(), env, fetcher);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ accepted: true });
    expect(fetcher.mock.calls[1][0]).toBe("https://api.resend.com/emails");
    const delivery = fetcher.mock.calls[1][1];
    expect(new Headers(delivery?.headers).get("Idempotency-Key")).toBe(`enquiry/${valid.requestId}`);
    expect(JSON.parse(String(delivery?.body))).toMatchObject({
      to: [env.RECIPIENT], reply_to: valid.email, text: expect.stringContaining(valid.project),
    });
  });

  it("blocks unexpected origins, malformed fields, bots and missing acknowledgement", async () => {
    const fetcher = vi.fn<typeof fetch>();
    expect((await handleEnquiry(request({}, "https://other.example"), env, fetcher)).status).toBe(403);
    expect((await handleEnquiry(request({ message: {} }), env, fetcher)).status).toBe(400);
    expect((await handleEnquiry(request({ website: "autofilled" }), env, fetcher)).status).toBe(400);
    expect((await handleEnquiry(request({ privacy: false }), env, fetcher)).status).toBe(422);
    expect((await handleEnquiry(request({ message: "x".repeat(9000) }), env, fetcher)).status).toBe(400);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("does not send mail for an invalid challenge, throttled visitor, or unavailable backend", async () => {
    const wrongHost = providers(200, "other.example");
    expect((await handleEnquiry(request(), env, wrongHost)).status).toBe(400);
    expect(wrongHost).toHaveBeenCalledTimes(1);
    const fetcher = vi.fn<typeof fetch>();
    const throttled = { ...env, ENQUIRY_RATE_LIMIT: { limit: async () => ({ success: false }) } };
    expect((await handleEnquiry(request(), throttled, fetcher)).status).toBe(429);
    expect((await handleEnquiry(request(), { ...env, RESEND_API_KEY: "" }, fetcher)).status).toBe(503);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("reports a provider delivery failure without accepting the enquiry", async () => {
    const response = await handleEnquiry(request(), env, providers(500));
    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "delivery" });
  });
});
