"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { displayTitle, embedUrl, thumbnailUrl, videoUrl, type Video } from "@/data/videos";

type Props = { video: Video; tone?: "dark" | "light"; large?: boolean };

/** Click-to-load YouTube facade: no YouTube scripts or cookies until the visitor presses play. */
export default function VideoCard({ video, tone = "dark", large = false }: Props) {
  const [playing, setPlaying] = useState(false);
  const title = displayTitle(video);
  const ratio = video.format === "short" ? "aspect-[9/16]" : "aspect-video";
  const onDark = tone === "dark";

  return (
    <article className="group flex h-full flex-col">
      <div className={`video-thumb relative w-full overflow-hidden bg-black ${ratio}`}>
        {playing ? (
          <iframe
            src={embedUrl(video)}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} className="img-zoom absolute inset-0 h-full w-full" aria-label={`Play video: ${title}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumbnailUrl(video)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90" />
            <span className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" aria-hidden="true" />
            <span
              className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/60 bg-charcoal/30 text-ivory backdrop-blur-sm transition-[transform,background-color,border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:border-gold group-hover:bg-gold group-hover:text-charcoal ${large ? "h-20 w-20" : "h-14 w-14"}`}
              aria-hidden="true"
            >
              <span className="absolute -inset-2 rounded-full border border-gold/0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-inset-3 group-hover:border-gold/40" />
              <Play size={large ? 24 : 18} strokeWidth={1.4} className="translate-x-0.5" fill="currentColor" />
            </span>
            <span className="absolute left-4 top-4 text-[0.6rem] font-medium uppercase tracking-[0.26em] text-ivory/85">
              {video.format === "short" ? "Short" : "Video"}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className={`${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"} leading-snug ${onDark ? "text-ivory" : "text-charcoal"}`}>{title}</h3>
        <a
          href={videoUrl(video)}
          target="_blank"
          rel="noopener noreferrer"
          className={`link-line mt-3 inline-flex self-start text-[0.65rem] font-medium uppercase tracking-[0.24em] transition-colors ${onDark ? "text-gold hover:text-ivory" : "text-gold-deep hover:text-charcoal"}`}
        >
          Watch on YouTube<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
