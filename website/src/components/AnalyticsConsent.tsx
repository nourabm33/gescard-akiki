"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  disableAnalytics, enableAnalytics, getConsent, onPrivacyPreferences, saveConsent,
  showPrivacyPreferences, track, trackLink, trackPage, type Consent,
} from "@/lib/analytics";

export function PrivacyPreferences() {
  return <button type="button" onClick={showPrivacyPreferences} className="text-left underline underline-offset-4 hover:text-champagne">Cookie settings</button>;
}

export default function AnalyticsConsent() {
  const path = usePathname();
  const [choice, setChoice] = useState<Consent>();
  const [open, setOpen] = useState(false);
  const acceptButton = useRef<HTMLButtonElement>(null);
  const trigger = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const saved = getConsent();
    setChoice(saved);
    setOpen(!saved);
    return onPrivacyPreferences(() => {
      trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setOpen(true);
      requestAnimationFrame(() => acceptButton.current?.focus());
    });
  }, []);

  useEffect(() => {
    if (choice !== "accepted") return;
    enableAnalytics();
    const click = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (anchor instanceof HTMLAnchorElement) trackLink(anchor);
    };
    const accepted = (event: Event) => {
      const slug: unknown = (event as CustomEvent).detail;
      track("generate_lead", typeof slug === "string" && /^[a-z0-9-]+$/.test(slug) ? { project_slug: slug } : {});
    };
    document.addEventListener("click", click, true);
    window.addEventListener("gescard:enquiry-accepted", accepted);
    return () => {
      document.removeEventListener("click", click, true);
      window.removeEventListener("gescard:enquiry-accepted", accepted);
    };
  }, [choice]);

  useEffect(() => { if (choice === "accepted") trackPage(path); }, [choice, path]);

  function choose(value: Consent) {
    saveConsent(value);
    if (value === "declined") disableAnalytics();
    setChoice(value);
    setOpen(false);
    trigger.current?.focus();
    trigger.current = null;
  }

  if (!open) return null;
  return (
    <aside aria-label="Analytics preferences" className="fixed inset-x-4 bottom-24 z-[70] max-w-sm border border-champagne/45 bg-burgundy p-5 text-sm leading-relaxed text-ivory shadow-xl sm:bottom-6 sm:left-6 sm:right-auto">
      <p className="font-semibold text-champagne">Optional analytics cookies</p>
      <p className="mt-2">Allow Google Analytics to measure visits and contact actions. You can change your choice at any time. <Link href="/privacy-policy/" className="underline underline-offset-4">Privacy policy</Link></p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button ref={acceptButton} type="button" onClick={() => choose("accepted")} className="border border-champagne/65 px-2 py-3 text-center hover:bg-ivory/10">Allow analytics</button>
        <button type="button" onClick={() => choose("declined")} className="border border-champagne/65 px-2 py-3 text-center hover:bg-ivory/10">Decline analytics</button>
      </div>
    </aside>
  );
}
