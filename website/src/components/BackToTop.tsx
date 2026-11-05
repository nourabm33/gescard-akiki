"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const R = 20;
const C = 2 * Math.PI * R;

/** Appears after the first screen; the gold ring traces reading progress. */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const ringRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      setVisible(window.scrollY > window.innerHeight * 0.8);
      ringRef.current?.style.setProperty("stroke-dashoffset", `${C * (1 - progress)}`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed bottom-[5.25rem] right-[1.625rem] z-40 flex h-11 w-11 items-center justify-center rounded-full bg-burgundy/85 text-ivory/80 backdrop-blur-sm transition-[opacity,transform,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-champagne sm:bottom-[6rem] sm:right-[2.125rem] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 44 44" aria-hidden="true">
        <circle cx="22" cy="22" r={R} fill="none" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1" />
        <circle ref={ringRef} cx="22" cy="22" r={R} fill="none" stroke="#e5c18f" strokeWidth="1" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <ArrowUp size={16} strokeWidth={1.5} className="transition-transform duration-500 group-hover:-translate-y-0.5" aria-hidden="true" />
    </button>
  );
}
