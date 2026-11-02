import type { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  as?: "h1" | "h2";
  className?: string;
};

export default function SectionHeading({ eyebrow, title, intro, tone = "dark", align = "left", as: H = "h2", className = "" }: Props) {
  const onDark = tone === "dark";
  return (
    <Reveal variant="stagger" className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${onDark ? "text-gold" : "text-gold-deep"} ${align === "center" ? "justify-center" : ""}`}>{eyebrow}</p>}
      <H className={`mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem] ${onDark ? "text-ivory" : "text-charcoal"}`}>{title}</H>
      {intro && <p className={`mt-6 max-w-xl text-base leading-relaxed sm:text-[1.05rem] ${align === "center" ? "mx-auto" : ""} ${onDark ? "text-ivory/70" : "text-charcoal/70"}`}>{intro}</p>}
    </Reveal>
  );
}
