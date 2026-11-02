import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import ResponsiveImage from "./ResponsiveImage";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: ImageKey;
  imageAlt?: string;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, intro, image, imageAlt = "", children }: Props) {
  return (
    <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-charcoal pb-16 pt-40 sm:pb-20 lg:min-h-[78vh] lg:pb-24">
      <div className="hero-bg absolute inset-0 -z-10">
        <ResponsiveImage image={image} alt={imageAlt} priority className="h-full w-full object-cover opacity-45" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" aria-hidden="true" />
      <div className="container-luxe">
        <p className="hero-rise eyebrow text-gold">{eyebrow}</p>
        <h1 className="hero-rise mt-6 max-w-4xl text-[2.9rem] leading-[1.02] text-ivory sm:text-6xl lg:text-[5.2rem]" style={{ "--d": "120ms" } as React.CSSProperties}>
          {title}
        </h1>
        {intro && (
          <p className="hero-rise mt-7 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg" style={{ "--d": "240ms" } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children && <div className="hero-rise mt-10" style={{ "--d": "360ms" } as React.CSSProperties}>{children}</div>}
      </div>
    </section>
  );
}
