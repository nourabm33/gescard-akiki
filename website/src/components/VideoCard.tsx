"use client";

import { Play } from "lucide-react";
import { useRef } from "react";
import { embedUrl, thumbnailUrl, videoUrl, type Video } from "@/data/videos";

type Props = { video: Video; playing: boolean; onPlay: () => void; onClose: () => void };

/** Mount the YouTube player when the visitor chooses to play it. */
export default function VideoCard({ video, playing, onPlay, onClose }: Props) {
  const thumbnailButton = useRef<HTMLButtonElement>(null);
  const { title, duration } = video;
  const preview = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={thumbnailUrl(video)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover opacity-90" />
      <span className="absolute inset-0 bg-gradient-to-t from-burgundy/85 via-burgundy/10 to-transparent" aria-hidden="true" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory/60 bg-burgundy/45 text-ivory transition-[transform,background-color,border-color,color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:border-champagne group-hover:bg-champagne group-hover:text-burgundy group-focus-within:border-champagne" aria-hidden="true">
        <Play size={18} strokeWidth={1.4} className="translate-x-0.5" fill="currentColor" />
      </span>
      <span className="absolute bottom-3 right-3 bg-burgundy/85 px-2 py-1 text-xs tabular-nums text-ivory">{duration}</span>
    </>
  );

  return (
    <article className="group flex h-full flex-col">
      <div className="video-thumb relative aspect-video w-full overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={embedUrl(video)}
            title={title}
            className="gallery-image absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : video.embeddable === false ? (
          <a href={videoUrl(video)} target="_blank" rel="noopener noreferrer" className="img-zoom absolute inset-0" aria-label={`Watch ${title} on YouTube (opens in a new tab)`}>{preview}</a>
        ) : (
          <button ref={thumbnailButton} type="button" onClick={onPlay} className="img-zoom absolute inset-0" aria-label={`Play video: ${title}`}>{preview}</button>
        )}
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <h3 className="break-words text-xl leading-snug text-ivory">{title}</h3>
        {playing && (
          <button type="button" className="link-line mt-3 self-start text-sm text-ivory/80" onClick={() => {
            onClose();
            requestAnimationFrame(() => thumbnailButton.current?.focus());
          }}>Close player<span className="sr-only">: {title}</span></button>
        )}
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
