"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";
import {
  cinematicPosterFile,
  cinematicVideoFile,
  type CinematicClip,
} from "@/lib/cinematic-video";

let activePlayer: HTMLVideoElement | null = null;

function pauseExclusive(player: HTMLVideoElement) {
  player.pause();
  if (activePlayer === player) activePlayer = null;
}

async function playExclusive(player: HTMLVideoElement) {
  if (activePlayer && activePlayer !== player) activePlayer.pause();
  activePlayer = player;
  try {
    await player.play();
  } catch (error) {
    if (activePlayer === player) activePlayer = null;
    throw error;
  }
}

export default function CinematicBackground({
  clip,
  autoplay = false,
  className = "",
}: {
  clip: CinematicClip;
  autoplay?: boolean;
  className?: string;
}) {
  const background = useRef<HTMLDivElement>(null);
  const player = useRef<HTMLVideoElement>(null);
  const [eligible, setEligible] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [nearby, setNearby] = useState(false);
  const [visible, setVisible] = useState(false);
  const [foreground, setForeground] = useState(true);
  const [armed, setArmed] = useState(false);
  const [requested, setRequested] = useState(autoplay);
  const [playing, setPlaying] = useState(false);
  const [hasFrame, setHasFrame] = useState(false);
  const [failed, setFailed] = useState(false);

  const attachPlayer = useCallback((video: HTMLVideoElement | null) => {
    if (!video && player.current) pauseExclusive(player.current);
    player.current = video;
  }, []);

  const poster480 = asset(`/video/${cinematicPosterFile(clip, 480)}`);
  const poster960 = asset(`/video/${cinematicPosterFile(clip, 960)}`);
  const source = asset(`/video/${cinematicVideoFile(clip, mobile)}`);

  useEffect(() => {
    const motionQuery = matchMedia("(prefers-reduced-motion: no-preference)");
    const mobileQuery = matchMedia("(max-width: 767px)");
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
      hardwareConcurrency?: number;
    });
    const refresh = () => {
      const slowConnection = /^(slow-2g|2g)$/.test(connection.connection?.effectiveType ?? "");
      const lowMemory = typeof connection.deviceMemory === "number" && connection.deviceMemory <= 2;
      const lowCpu = typeof connection.hardwareConcurrency === "number" && connection.hardwareConcurrency <= 2;
      setEligible(motionQuery.matches && !connection.connection?.saveData && !slowConnection && !lowMemory && !lowCpu);
      setMobile(mobileQuery.matches);
    };
    const updateForeground = () => setForeground(!document.hidden);

    refresh();
    updateForeground();
    motionQuery.addEventListener("change", refresh);
    mobileQuery.addEventListener("change", refresh);
    document.addEventListener("visibilitychange", updateForeground);

    const element = background.current;
    const proximityObserver = new IntersectionObserver(
      ([entry]) => setNearby(entry.isIntersecting),
      { rootMargin: "220px 0px" },
    );
    const viewportObserver = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting && entry.intersectionRatio >= 0.2),
      { threshold: [0, 0.2] },
    );
    if (element) {
      proximityObserver.observe(element);
      viewportObserver.observe(element);
    }

    return () => {
      motionQuery.removeEventListener("change", refresh);
      mobileQuery.removeEventListener("change", refresh);
      document.removeEventListener("visibilitychange", updateForeground);
      proximityObserver.disconnect();
      viewportObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!eligible || !nearby || failed) {
      setArmed(false);
      setHasFrame(false);
      return;
    }

    let timer: number | undefined;
    const arm = () => {
      timer = window.setTimeout(() => setArmed(true), visible ? 550 : 0);
    };
    if (visible && document.readyState !== "complete") {
      window.addEventListener("load", arm, { once: true });
    } else {
      arm();
    }
    return () => {
      window.removeEventListener("load", arm);
      if (timer !== undefined) window.clearTimeout(timer);
    };
  }, [eligible, failed, nearby, visible]);

  const pause = useCallback(() => {
    if (player.current) pauseExclusive(player.current);
  }, []);

  useEffect(() => {
    const video = player.current;
    if (!video) return;
    if (eligible && nearby && visible && foreground && requested && armed && !failed) {
      void playExclusive(video).catch(() => setPlaying(false));
    } else {
      pauseExclusive(video);
    }
  }, [armed, eligible, failed, foreground, nearby, requested, visible, mobile]);

  function toggle() {
    if (playing) {
      setRequested(false);
      pause();
      return;
    }
    setRequested(true);
    setFailed(false);
    if (nearby) setArmed(true);
    if (player.current && visible && foreground) {
      void playExclusive(player.current).catch(() => setPlaying(false));
    }
  }

  return (
    <>
      <div ref={background} className={`pointer-events-none absolute inset-0 z-0 ${className}`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster480}
          srcSet={`${poster480} 480w, ${poster960} 960w`}
          sizes="100vw"
          width={960}
          height={540}
          alt=""
          loading="lazy"
          fetchPriority="low"
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hasFrame ? "opacity-0" : "opacity-100"}`}
        />
        {eligible && nearby && armed && !failed && (
          <video
            ref={attachPlayer}
            src={source}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            onPlaying={() => { setPlaying(true); setHasFrame(true); }}
            onPause={() => setPlaying(false)}
            onError={() => {
              setFailed(true);
              setPlaying(false);
              setHasFrame(false);
            }}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${hasFrame ? "opacity-100" : "opacity-0"}`}
          />
        )}
      </div>
      {eligible && (
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background motion" : "Play background motion"}
          className="absolute bottom-5 right-24 z-40 min-h-11 border border-ivory/45 bg-burgundy/90 px-4 text-xs text-ivory shadow-sm transition-colors hover:border-champagne hover:text-champagne focus-visible:border-champagne"
        >
          {playing ? "Pause background motion" : "Play background motion"}
        </button>
      )}
    </>
  );
}
