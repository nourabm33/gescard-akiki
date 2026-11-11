"use client";

import { useState } from "react";
import { instagramReels } from "@/data/instagram";
import { profile } from "@/data/profile";
import { useMediaFeed } from "@/lib/use-media-feed";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { InstagramIcon } from "./icons";

export default function InstagramSection({ limit = 3 }: { limit?: number }) {
  const ig = profile.socials.instagram;
  const [activeReel, setActiveReel] = useState<string | null>(null);
  const feed = useMediaFeed();
  const reels = (feed?.instagram?.items ?? instagramReels).slice(0, limit);

  return (
    <section className="border-t border-burgundy/10 bg-ivory py-24 text-burgundy sm:py-32" aria-labelledby="instagram-heading">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading tone="light" eyebrow="Instagram Reels" title={<span id="instagram-heading">Insights in Motion</span>} intro="Quick perspectives from Gescard’s site visits and conversations about the UAE property market." />
          <Reveal>
            <ButtonLink href={`${ig.url}reels/`} variant="outline-dark" icon={<InstagramIcon size={17} />}>{ig.handle}</ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reels.map((reel, index) => {
            const active = reel.id === activeReel;
            return (
              <Reveal as="li" key={reel.id} delay={(index % 3) * 100} className="min-w-0 border border-burgundy/15 transition-colors focus-within:border-wine/50 hover:border-wine/50">
                {reel.thumbnail && (
                  <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-burgundy text-champagne">
                    <InstagramIcon size={28} aria-hidden="true" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={reel.thumbnail} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" onError={(event) => { event.currentTarget.hidden = true; }} />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.23em] text-wine">{reel.topic}</p>
                  <h3 className="mb-6 mt-3 break-words text-xl leading-snug lg:text-2xl">{reel.title}</h3>
                  <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
                    <button type="button" aria-expanded={active} aria-controls={`reel-${reel.id}`} onClick={() => setActiveReel(active ? null : reel.id)} className="link-line py-2 text-sm font-semibold text-wine">
                      {active ? "Hide preview" : "Load preview"}<span className="sr-only">: {reel.title}</span>
                    </button>
                    <a href={`${ig.url}reel/${reel.id}/`} target="_blank" rel="noopener noreferrer" className="py-2 text-sm underline underline-offset-4 hover:text-wine">
                      Open on Instagram<span className="sr-only">: {reel.title} (opens in a new tab)</span>
                    </a>
                  </div>
                </div>
                <div id={`reel-${reel.id}`} hidden={!active} className="border-t border-burgundy/15 bg-white">
                  {active && (
                    <iframe
                      src={`https://www.instagram.com/reel/${reel.id}/embed/`}
                      title={`Instagram Reel: ${reel.title}`}
                      className="gallery-image block h-[34rem] w-full"
                      allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
