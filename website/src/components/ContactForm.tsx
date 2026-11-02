"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import {
  budgetOptions,
  enquiryText,
  interestOptions,
  limits,
  mailtoLink,
  validateEnquiry,
  whatsappLink,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";
import { WhatsAppIcon } from "./icons";

const empty: EnquiryInput = { name: "", email: "", phone: "", interest: "", budget: "", location: "", message: "", privacy: false };

const interestFromQuery: Record<string, string> = {
  investment: "Property investment",
  apartment: "Apartment",
  villa: "Villa",
  home: "Buying a home",
};

export default function ContactForm() {
  const id = useId();
  const params = useSearchParams();
  const [values, setValues] = useState<EnquiryInput>(empty);
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [sent, setSent] = useState<{ wa: string; mail: string } | null>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interest = interestFromQuery[params.get("interest") ?? ""];
    const property = params.get("property");
    if (interest || property) {
      setValues((v) => ({
        ...v,
        interest: interest ?? v.interest,
        message: property && !v.message ? `I'm interested in the property: ${property.slice(0, 120)}` : v.message,
      }));
    }
  }, [params]);

  const set = <K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, errors: found } = validateEnquiry(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`${id}-${first}`)?.focus();
      setSent(null);
      return;
    }
    const text = enquiryText(data);
    const wa = whatsappLink(text);
    const mail = mailtoLink(`Property enquiry from ${data.name}`, text);
    setSent({ wa, mail });
    window.open(wa, "_blank", "noopener,noreferrer");
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const fieldId = (k: keyof EnquiryInput) => `${id}-${k}`;
  const errorId = (k: keyof EnquiryInput) => `${id}-${k}-error`;
  const describe = (k: keyof EnquiryInput) => (errors[k] ? { "aria-invalid": true as const, "aria-describedby": errorId(k) } : {});
  const Err = ({ k }: { k: keyof EnquiryInput }) =>
    errors[k] ? (
      <p id={errorId(k)} className="feedback-in mt-2 text-[0.8rem] text-[#e9b4a2]" role="alert">
        {errors[k]}
      </p>
    ) : null;
  const Label = ({ k, children, required }: { k: keyof EnquiryInput; children: string; required?: boolean }) => (
    <label htmlFor={fieldId(k)} className="block text-[0.66rem] font-medium uppercase tracking-[0.24em] text-ivory/65">
      {children}
      {required ? <span className="text-gold"> *</span> : <span className="normal-case tracking-normal text-ivory/40"> (optional)</span>}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="form-luxe space-y-8" aria-describedby={`${id}-note`}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <Label k="name" required>Full name</Label>
          <input id={fieldId("name")} name="name" type="text" autoComplete="name" required maxLength={limits.name} value={values.name} onChange={(e) => set("name", e.target.value)} className="field" {...describe("name")} />
          <Err k="name" />
        </div>
        <div>
          <Label k="email" required>Email address</Label>
          <input id={fieldId("email")} name="email" type="email" autoComplete="email" inputMode="email" required maxLength={limits.email} value={values.email} onChange={(e) => set("email", e.target.value)} className="field" {...describe("email")} />
          <Err k="email" />
        </div>
        <div>
          <Label k="phone">WhatsApp / phone number</Label>
          <input id={fieldId("phone")} name="phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="+971 …" maxLength={limits.phone} value={values.phone} onChange={(e) => set("phone", e.target.value)} className="field" {...describe("phone")} />
          <Err k="phone" />
        </div>
        <div>
          <Label k="interest">What are you interested in?</Label>
          <select id={fieldId("interest")} name="interest" value={values.interest} onChange={(e) => set("interest", e.target.value)} className="field">
            <option value="">Select an option</option>
            {interestOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <Label k="budget">Estimated budget</Label>
          <select id={fieldId("budget")} name="budget" value={values.budget} onChange={(e) => set("budget", e.target.value)} className="field">
            <option value="">Select a range</option>
            {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>
        <div>
          <Label k="location">Preferred location in the UAE</Label>
          <input id={fieldId("location")} name="location" type="text" placeholder="e.g. Dubai Hills Estate" maxLength={limits.location} value={values.location} onChange={(e) => set("location", e.target.value)} className="field" />
        </div>
      </div>
      <div>
        <Label k="message">Message</Label>
        <textarea id={fieldId("message")} name="message" rows={4} maxLength={limits.message} value={values.message} onChange={(e) => set("message", e.target.value)} className="field resize-y" placeholder="Tell Gescard what you are looking for" />
        <p className="mt-2 text-right text-[0.7rem] text-ivory/40">{values.message.length}/{limits.message}</p>
      </div>
      <div>
        <div className="flex items-start gap-3">
          <input id={fieldId("privacy")} name="privacy" type="checkbox" checked={values.privacy} onChange={(e) => set("privacy", e.target.checked)} className="mt-1 h-4 w-4 shrink-0 cursor-pointer accent-[#c3a477]" {...describe("privacy")} />
          <label htmlFor={fieldId("privacy")} className="cursor-pointer text-sm leading-relaxed text-ivory/75">
            I have read the{" "}
            <Link href="/privacy-policy/" className="text-gold underline underline-offset-4 hover:text-ivory">privacy policy</Link>{" "}
            and agree that my details are shared with Gescard via WhatsApp to respond to my enquiry. <span className="text-gold">*</span>
          </label>
        </div>
        <Err k="privacy" />
      </div>

      <div className="flex flex-col gap-5 border-t border-ivory/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p id={`${id}-note`} className="max-w-sm text-[0.82rem] leading-relaxed text-ivory/60">
          Submitting opens WhatsApp with your message ready to send to Gescard. Nothing is sent until you press send in WhatsApp.
        </p>
        <button type="submit" className="btn-sweep group inline-flex shrink-0 items-center justify-center gap-3 bg-gold px-8 py-4 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-charcoal transition-transform duration-300 [--sweep:var(--color-ivory)] active:scale-[0.98]">
          <WhatsAppIcon size={17} /> Send via WhatsApp
        </button>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {sent && (
          <div className="feedback-in border border-gold/40 bg-gold/[0.06] p-6">
            <p className="font-serif text-2xl text-ivory">WhatsApp is opening with your message ready to send.</p>
            <p className="mt-3 text-sm leading-relaxed text-ivory/70">
              Review the message and press send in WhatsApp to deliver it. If WhatsApp did not open,{" "}
              <a href={sent.wa} target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4">open it here</a>
              , or{" "}
              <a href={sent.mail} className="text-gold underline underline-offset-4">send the same enquiry by email</a>.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
