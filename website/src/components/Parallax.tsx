"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = { children: ReactNode; className?: string; speed?: number };

/** Very light scroll parallax for hero backgrounds. Desktop only; disabled for reduced motion. */
export default function Parallax({ children, className = "", speed = 0.12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = Math.min(window.scrollY, window.innerHeight * 1.2);
      el.style.setProperty("--parallax", `${(y * speed).toFixed(1)}px`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const bind = () => {
      window.removeEventListener("scroll", onScroll);
      el.style.removeProperty("--parallax");
      if (mq.matches) {
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
      }
    };
    bind();
    mq.addEventListener("change", bind);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", bind);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`parallax ${className}`}>
      {children}
    </div>
  );
}
