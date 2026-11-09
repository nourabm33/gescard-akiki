"use client";

import { Play } from "lucide-react";
import { useState } from "react";
import { embedUrl, thumbnailUrl, videoUrl, type Video } from "@/data/videos";

/** Mount the YouTube player when the visitor chooses to play it. */
export default function VideoCard({ video }: { video: Video }) {
  const [playing, setPlaying] = useState(false);
  const { title, duration } = video;

  return (
    <article className="group flex h-full flex-col">
      <div className="video-thumb relative aspect-video w-full overflow-hidden bg-black">
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
            <span className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/10 to-transparent" aria-hidden="true" />
            <span
              className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/60 bg-burgundy/30 text-ivory backdrop-blur-sm transition-[transform,background-color,border-color,color] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.08] group-hover:border-champagne group-hover:bg-champagne group-hover:text-burgundy"
              aria-hidden="true"
            >
              <span className="absolute -inset-2 rounded-full border border-champagne/0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-inset-3 group-hover:border-champagne/40" />
              <Play size={18} strokeWidth={1.4} className="translate-x-0.5" fill="currentColor" />
            </span>
            <span className="absolute bottom-3 right-3 bg-burgundy/85 px-2 py-1 text-xs tabular-nums text-ivory">
              {duration}
            </span>
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="text-xl leading-snug text-ivory">{title}</h3>
        <a
          href={videoUrl(video)}
          target="_blank"
          rel="noopener noreferrer"
          className="link-line mt-auto inline-flex self-start pt-3 text-[0.65rem] font-medium uppercase tracking-[0.24em] text-champagne transition-colors hover:text-ivory"
        >
          Watch on YouTube<span className="sr-only">: {title} (opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
