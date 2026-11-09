"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { asset } from "@/lib/site";

type Img = { src: string; alt: string };

export default function PropertyGallery({ images, title }: { images: Img[]; title: string }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const count = images.length;
  const go = useCallback((d: number) => setActive((i) => (i + d + count) % count), [count]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!lightbox || !dialog) return;
    dialog.showModal();
    const overflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    dialog.addEventListener("keydown", onKey);
    return () => {
      dialog.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = overflow;
    };
  }, [lightbox, go]);

  if (!count) return null;
  const current = images[active];

  return (
    <div>
      <button ref={openerRef} type="button" onClick={() => setLightbox(true)} className="img-zoom group relative block aspect-[16/10] w-full overflow-hidden bg-burgundy-soft" aria-label={`Open gallery: ${current.alt}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset(current.src)} alt={current.alt} className="h-full w-full object-cover" fetchPriority="high" />
        <span className="absolute bottom-4 right-4 bg-burgundy/80 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.22em] text-ivory">
          {active + 1} / {count}
        </span>
      </button>
      {count > 1 && (
        <ul className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6" aria-label={`${title} photos`}>
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show photo ${i + 1}: ${img.alt}`}
                aria-current={i === active}
                className={`block aspect-[4/3] w-full overflow-hidden transition-opacity ${i === active ? "opacity-100 ring-1 ring-champagne" : "opacity-55 hover:opacity-100"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset(img.src)} alt="" loading="lazy" className="h-full w-full object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {lightbox && (
        <dialog ref={dialogRef} aria-label={`${title} gallery`} onClose={() => {
          setLightbox(false);
          openerRef.current?.focus();
        }} className="fixed inset-0 m-0 h-full max-h-none w-full max-w-none items-center justify-center bg-burgundy/97 p-4 open:flex backdrop:bg-burgundy">
          <button type="button" onClick={() => dialogRef.current?.close()} className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center text-ivory hover:text-champagne" aria-label="Close gallery">
            <X strokeWidth={1.3} />
          </button>
          {count > 1 && (
            <button type="button" onClick={() => go(-1)} className="absolute left-2 flex h-12 w-12 items-center justify-center text-ivory hover:text-champagne sm:left-6" aria-label="Previous photo">
              <ChevronLeft strokeWidth={1.3} size={32} />
            </button>
          )}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={asset(current.src)} alt={current.alt} className="max-h-[85vh] max-w-full object-contain" />
          {count > 1 && (
            <button type="button" onClick={() => go(1)} className="absolute right-2 flex h-12 w-12 items-center justify-center text-ivory hover:text-champagne sm:right-6" aria-label="Next photo">
              <ChevronRight strokeWidth={1.3} size={32} />
            </button>
          )}
        </dialog>
      )}
    </div>
  );
}
