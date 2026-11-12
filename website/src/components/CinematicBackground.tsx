"use client";

import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

export default function CinematicBackground({ clip, autoplay = false, className = "" }: {
  clip: "arrival" | "awards-team";
  autoplay?: boolean;
  className?: string;
}) {
  const background = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [eligible, setEligible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [requested, setRequested] = useState(autoplay);
  const [armed, setArmed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);
  const base = `/video/${clip}`;

  useEffect(() => {
    const query = matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const refresh = () => setEligible(query.matches && !connection?.saveData && !connection?.effectiveType?.endsWith("2g"));
    const visibility = () => setForeground(!document.hidden);
    refresh();
    visibility();
    query.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", visibility);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.15 });
    if (background.current) observer.observe(background.current);
    return () => {
      query.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", visibility);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!eligible || !requested || !visible || !foreground || armed) return;
    let timer: number;
    const defer = () => { timer = window.setTimeout(() => setArmed(true), 1200); };
    if (document.readyState === "complete") defer();
    else window.addEventListener("load", defer, { once: true });
    return () => { window.clearTimeout(timer); window.removeEventListener("load", defer); };
  }, [eligible, requested, visible, foreground, armed]);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    if (eligible && visible && foreground && requested) video.play().catch(() => setPlaying(false));
    else video.pause();
  }, [armed, eligible, visible, foreground, requested]);

  function toggle() {
    if (playing) {
      setRequested(false);
      player.current?.pause();
    } else {
      setRequested(true);
      setArmed(true);
      player.current?.play().catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <div ref={background} className={`pointer-events-none absolute inset-0 -z-20 ${className}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(`${base}-480.webp`)} srcSet={`${asset(`${base}-480.webp`)} 480w, ${asset(`${base}-960.webp`)} 960w`}
          sizes="100vw" width={960} height={540} alt="" loading="lazy" fetchPriority="low" decoding="async"
          className="absolute inset-0 h-full w-full object-cover" />
        {eligible && armed && !failed && (
          <video ref={player} src={asset(`${base}.mp4`)} muted loop playsInline preload="none"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hasFrame ? "opacity-100" : "opacity-0"}`}
            onPlaying={() => { setPlaying(true); setHasFrame(true); }}
            onPause={() => setPlaying(false)}
            onError={() => { setFailed(true); setPlaying(false); }}
          />
        )}
      </div>
      {eligible && !failed && (
        <button type="button" onClick={toggle} className="absolute bottom-6 right-24 z-10 min-h-11 border border-ivory/35 bg-burgundy/80 px-4 text-xs text-ivory transition-colors hover:border-champagne hover:text-champagne">
          {playing ? "Pause background motion" : "Play background motion"}
        </button>
      )}
    </>
  );
}
