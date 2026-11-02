import { describe, expect, it } from "vitest";
import { enquiryText, sanitize, validateEnquiry, whatsappLink, type EnquiryInput } from "./enquiry";

const base: EnquiryInput = { name: "Jane Doe", email: "Jane@Example.com", phone: "+971 50 123 4567", interest: "Villa", budget: "Not decided yet", location: "Dubai Hills", message: "Hello", privacy: true };

describe("validateEnquiry", () => {
  it("accepts a valid enquiry and normalises email", () => {
    const { data, errors } = validateEnquiry(base);
    expect(errors).toEqual({});
    expect(data.email).toBe("jane@example.com");
  });
  it("requires name, email and privacy", () => {
    const { errors } = validateEnquiry({ ...base, name: " ", email: "", privacy: false });
    expect(Object.keys(errors).sort()).toEqual(["email", "name", "privacy"]);
  });
  it("rejects invalid email and phone", () => {
    const { errors } = validateEnquiry({ ...base, email: "nope@", phone: "abc" });
    expect(errors.email).toBeDefined();
    expect(errors.phone).toBeDefined();
  });
  it("drops values not in the select lists", () => {
    const { data } = validateEnquiry({ ...base, interest: "<script>", budget: "free" });
    expect(data.interest).toBe("");
    expect(data.budget).toBe("");
  });
});

describe("sanitize", () => {
  it("strips markup brackets and control characters, enforces length", () => {
    expect(sanitize("  <b>Hi</b>\u0007 there  ", 50)).toBe("bHi/b there");
    expect(sanitize("a".repeat(20), 5)).toBe("aaaaa");
  });
});

describe("WhatsApp message", () => {
  it("lists only provided fields and encodes the URL", () => {
    const { data } = validateEnquiry({ ...base, phone: "", location: "" });
    const text = enquiryText(data);
    expect(text).toContain("Name: Jane Doe");
    expect(text).not.toContain("Preferred location");
    expect(text).toContain("Message:\nHello");
    expect(whatsappLink(text)).toMatch(/^https:\/\/wa\.me\/971527760240\?text=Hello%20Gescard/);
  });
});
