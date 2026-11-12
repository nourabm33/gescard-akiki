import type { ReactNode } from "react";
import type { ImageKey } from "@/lib/images";
import type { CinematicClip } from "@/lib/cinematic-video";
import CinematicBackground from "./CinematicBackground";
import Parallax from "./Parallax";
import ResponsiveImage from "./ResponsiveImage";
import SplitWords from "./SplitWords";

type Props = {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image: ImageKey;
  imageAlt?: string;
  videoClip?: CinematicClip;
  children?: ReactNode;
};

export default function PageHero({ eyebrow, title, intro, image, imageAlt = "", videoClip, children }: Props) {
  return (
    <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden bg-burgundy pb-16 pt-40 sm:pb-20 lg:min-h-[78vh] lg:pb-24">
      {videoClip ? (
        <CinematicBackground clip={videoClip} autoplay />
      ) : (
        <Parallax className="absolute inset-0 -z-10">
          <div className="hero-bg h-full w-full">
            <ResponsiveImage image={image} alt={imageAlt} sizes="(max-width: 639px) 220px, 100vw" priority className="h-full w-full object-cover opacity-45" />
          </div>
        </Parallax>
      )}
      <div className={`absolute inset-0 ${videoClip ? "z-10 bg-gradient-to-t from-burgundy via-burgundy/60 to-burgundy/20" : "-z-10 bg-gradient-to-t from-burgundy via-burgundy/70 to-burgundy/30"}`} aria-hidden="true" />
      <div className="container-luxe relative z-20">
        <p className="hero-rise eyebrow text-champagne">{eyebrow}</p>
        <h1 className="mt-6 max-w-4xl text-[2.9rem] leading-[1.02] text-ivory sm:text-6xl lg:text-[5.2rem]">
          {typeof title === "string" ? <SplitWords segments={[title]} delay={120} /> : title}
        </h1>
        {intro && (
          <p className="hero-rise mt-7 max-w-xl text-base leading-relaxed text-ivory/75 sm:text-lg" style={{ "--d": "520ms" } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children && <div className="hero-rise mt-10" style={{ "--d": "660ms" } as React.CSSProperties}>{children}</div>}
      </div>
    </section>
  );
}
