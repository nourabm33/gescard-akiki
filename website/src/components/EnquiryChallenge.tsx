"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type Turnstile = {
  render(element: HTMLElement, options: Record<string, unknown>): string;
  remove(widget: string): void;
  reset(widget: string): void;
};

let loading: Promise<Turnstile> | undefined;

function loadTurnstile() {
  const browser = window as Window & { turnstile?: Turnstile };
  if (browser.turnstile) return Promise.resolve(browser.turnstile);
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => browser.turnstile ? resolve(browser.turnstile) : reject();
    script.onerror = reject;
    document.head.append(script);
  });
  return loading;
}

export default function EnquiryChallenge({ siteKey, onToken, reset }: {
  siteKey: string;
  onToken: (token: string) => void;
  reset: RefObject<() => void>;
}) {
  const container = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");

  useEffect(() => {
    let dispose: (() => void) | undefined;
    let live = true;
    const timer = window.setTimeout(() => { if (live) setStatus("unavailable"); }, 10000);
    loadTurnstile().then((api) => {
      if (!live || !container.current) return;
      const widget = api.render(container.current, {
        sitekey: siteKey,
        action: "enquiry",
        theme: "dark",
        size: "flexible",
        callback: (token: string) => { setStatus("ready"); onToken(token); },
        "expired-callback": () => onToken(""),
        "error-callback": () => { setStatus("unavailable"); onToken(""); },
      });
      reset.current = () => api.reset(widget);
      dispose = () => { api.remove(widget); reset.current = () => {}; };
      setStatus("ready");
    }).catch(() => { if (live) setStatus("unavailable"); }).finally(() => window.clearTimeout(timer));
    return () => { live = false; window.clearTimeout(timer); dispose?.(); };
  }, [siteKey, onToken, reset, setStatus]);

  return (
    <div>
      <div ref={container} />
      {status === "loading" && <p role="status" className="text-sm text-ivory/80">Loading the security check…</p>}
      {status === "unavailable" && <p role="status" className="text-sm text-[#e9b4a2]">The security check is unavailable. You can still contact Gescard by WhatsApp or email.</p>}
    </div>
  );
}
