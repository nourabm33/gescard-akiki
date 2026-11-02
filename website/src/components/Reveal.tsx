"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /** up: fade-up · fade: opacity only · stagger: direct children rise in sequence · image: clip-path mask wipe */
  variant?: "up" | "fade" | "stagger" | "image";
  /** Direction of the image mask wipe. */
  from?: "bottom" | "left" | "right";
};

const variantClass = {
  up: "reveal",
  fade: "reveal reveal-fade",
  stagger: "reveal-stagger",
  image: "reveal-mask",
} as const;

export default function Reveal({ children, as: Tag = "div", delay = 0, className = "", variant = "up", from = "bottom" }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: variant === "image" ? 0 : 0.06 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [variant]);

  return (
    <Tag
      ref={ref}
      className={`${variantClass[variant]} ${className}`}
      data-from={variant === "image" && from !== "bottom" ? from : undefined}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
