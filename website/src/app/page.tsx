import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import DubaiFuture from "@/components/DubaiFuture";
import FinalCta from "@/components/FinalCta";
import InstagramSection from "@/components/InstagramSection";
import PropertiesEmptyState from "@/components/PropertiesEmptyState";
import PropertyGrid from "@/components/PropertyGrid";
import ResponsiveImage from "@/components/ResponsiveImage";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import SplitWords from "@/components/SplitWords";
import SectionHeading from "@/components/SectionHeading";
import YouTubeSection from "@/components/YouTubeSection";
import { profile } from "@/data/profile";
import { getFeaturedProperties } from "@/data/properties";
import { principles, serviceHighlights } from "@/data/services";

export default function HomePage() {
  const featured = getFeaturedProperties(3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-burgundy lg:min-h-[100svh]">
        <Parallax className="absolute inset-0 -z-20">
          <div className="hero-bg h-full w-full">
            <ResponsiveImage image="stock/dubai-skyline" alt="" priority className="h-full w-full object-cover object-[60%_center] opacity-20" />
          </div>
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_48%,rgba(140,39,79,0.5),rgba(48,7,25,0.9)_62%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-burgundy via-burgundy/80 to-transparent" aria-hidden="true" />

        <div className="container-luxe grid items-center gap-10 pb-20 pt-28 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-0 lg:pb-24 lg:pt-32">
          {/* Portrait */}
          <div className="relative order-2 mx-auto w-full max-w-[430px] lg:col-span-5 lg:col-start-8 lg:row-start-1">
            <div className="absolute inset-0 translate-x-2 translate-y-2 border border-champagne/35 sm:translate-x-3 sm:translate-y-3" aria-hidden="true" />
            <ResponsiveImage
              image="gescard/office-portrait"
              alt="Gescard Akiki seated at the RichKey Properties office"
              priority
              sizes="(min-width: 640px) 430px, 90vw"
              className="hero-portrait relative aspect-[4/5] w-full object-cover object-[50%_62%]"
            />
          </div>

          {/* Copy */}
          <div className="relative order-1 flex flex-col justify-center lg:col-span-7 lg:col-start-1 lg:row-start-1 lg:pr-10">
            <p className="hero-rise eyebrow text-champagne">Private Property Advisory</p>
            <h1 className="mt-6 text-[2.35rem] leading-[1.08] text-ivory sm:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]">
              <SplitWords segments={[profile.name]} delay={150} />
            </h1>
            <p className="hero-rise signature mt-6 text-2xl text-champagne sm:text-[1.7rem]" style={{ "--d": "700ms" } as React.CSSProperties}>
              Vision. Value. Trust.
            </p>
            <p className="hero-rise mt-6 max-w-lg text-base leading-relaxed text-ivory/85 sm:text-lg" style={{ "--d": "780ms" } as React.CSSProperties}>
              {profile.title} at {profile.agency.name}. I help buyers and investors evaluate off-plan homes in Dubai and Abu Dhabi, with location at the centre of every decision.
            </p>
            <div className="hero-rise mt-10 flex flex-col flex-wrap gap-4 sm:flex-row" style={{ "--d": "880ms" } as React.CSSProperties}>
              <ButtonLink href="/contact/">Book a Consultation</ButtonLink>
              <ButtonLink href="/properties/" variant="outline">Explore Developments</ButtonLink>
            </div>
          </div>
        </div>

        <a href="#introduction" style={{ "--d": "1300ms" } as React.CSSProperties} className="hero-rise absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] uppercase tracking-[0.34em] text-ivory/60 transition-colors hover:text-champagne lg:flex" aria-label="Scroll to introduction">
          Scroll
          <span className="relative block h-12 w-px overflow-hidden bg-ivory/15" aria-hidden="true">
            <span className="scroll-cue absolute inset-0 bg-champagne" />
          </span>
        </a>
      </section>

      {/* INTRODUCTION */}
      <section id="introduction" className="bg-ivory py-24 text-burgundy sm:py-32 lg:py-40">
        <div className="container-luxe grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal variant="stagger" className="lg:col-span-6">
            <p className="eyebrow text-wine">The Approach</p>
            <h2 className="mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.2rem]">
              More Than Real Estate. <em className="font-normal text-wine">A Personal Approach.</em>
            </h2>
          </Reveal>
          <Reveal variant="stagger" className="flex flex-col justify-end lg:col-span-5 lg:col-start-8" delay={250}>
            <p className="text-lg leading-relaxed text-burgundy/75 sm:text-xl sm:leading-relaxed">
              Every property search starts with understanding what matters to you. With four years of real estate experience and a genuine passion for the work, Gescard makes buying feel personal, considered and comfortable, whether you&rsquo;re exploring an investment or searching for your next home.
            </p>
            <div className="mt-10">
              <ButtonLink href="/about/" variant="outline-dark">Discover Gescard</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* RICHKEY PROPERTIES */}
      <section className="bg-burgundy py-24 sm:py-32" aria-labelledby="richkey-heading">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal variant="image" from="left" className="lg:col-span-6">
            <ResponsiveImage image="gescard/richkey-office" alt="Gescard Akiki pointing to the RichKey sign at the RichKey Properties office" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8">
            <SectionHeading eyebrow={profile.agency.name} title={<span id="richkey-heading">Part of the RichKey team.</span>} />
            <Reveal delay={120} className="mt-6 space-y-5 text-base leading-relaxed text-ivory/75 sm:text-lg">
              <p>Gescard works as a property consultant at {profile.agency.name}, from the brokerage&rsquo;s office at Dubai Hills Business Park.</p>
              <p>You deal with him directly from the first conversation to the final paperwork, with the RichKey team behind every enquiry.</p>
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <ButtonLink href="https://richkey.ae/" variant="text">Visit RichKey Properties</ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="bg-ivory py-24 text-burgundy sm:py-32" aria-labelledby="awards-heading">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <SectionHeading tone="light" eyebrow="Recognition" title={<span id="awards-heading"><span className="whitespace-nowrap">Multi-Awarded.</span> <em className="font-normal text-wine">Recognised by <span className="whitespace-nowrap">Top-Tier</span> Developers.</em></span>} />
            <Reveal delay={120} className="mt-6 text-base leading-relaxed text-burgundy/75 sm:text-lg">
              <p>Gescard is a multi-awarded agent, recognised by leading UAE developers. The awards display at the RichKey office includes recognition from Emaar, DAMAC, Sobha and BNW.</p>
            </Reveal>
            <Reveal delay={200} className="mt-8">
              <ButtonLink href="/about/" variant="outline-dark">Discover Gescard</ButtonLink>
            </Reveal>
          </div>
          <Reveal as="figure" variant="image" from="right" className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <ResponsiveImage image="gescard/awards-shelf" alt="Developer awards from Emaar, DAMAC, Sobha and BNW on the RichKey Properties awards shelf" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-square w-full object-cover" />
          </Reveal>
        </div>
      </section>

      {/* BRAND STATEMENT */}
      <section className="bg-charcoal py-24 sm:py-32" aria-labelledby="statement-heading">
        <Reveal variant="stagger" className="container-luxe flex flex-col items-center text-center">
          <h2 id="statement-heading" className="text-[2.2rem] leading-[1.1] text-champagne sm:text-5xl lg:text-6xl">Timeless Assets.</h2>
          <span className="mt-7 block h-px w-16 bg-champagne/60" aria-hidden="true" />
          <p className="signature mt-7 text-2xl text-ivory sm:text-3xl">Value that cannot be replicated.</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/65">
            Gescard is drawn to properties with lasting qualities: a location, a design and a character that can&rsquo;t be recreated.
          </p>
        </Reveal>
      </section>

      {/* SERVICE HIGHLIGHTS */}
      <section className="bg-burgundy py-24 sm:py-32" aria-labelledby="services-heading">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Expertise" title={<span id="services-heading">UAE Real Estate, Tailored to Your Goals.</span>} />
            <Reveal delay={100}><ButtonLink href="/expertise/" variant="text">View expertise</ButtonLink></Reveal>
          </div>
          <ul className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
            {serviceHighlights.map((s, i) => (
              <Reveal as="li" variant="image" key={s.title} delay={i * 140}>
                <Link href={s.href} className="group relative block aspect-[3/4] overflow-hidden md:aspect-[3/4.4]">
                  <span className="img-zoom absolute inset-0 block">
                    <ResponsiveImage image={s.image} alt={s.alt} sizes="(min-width: 768px) 33vw, 100vw" className="h-full w-full object-cover" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-t from-burgundy via-burgundy/45 to-burgundy/5 transition-opacity duration-700 group-hover:opacity-90" aria-hidden="true" />
                  <span className="absolute inset-x-0 bottom-0 flex flex-col p-7 lg:p-9">
                    <span className="font-sans text-[0.68rem] tracking-[0.3em] text-champagne">0{i + 1}</span>
                    <span className="mt-4 font-serif text-[2rem] uppercase leading-none tracking-[0.04em] text-ivory lg:text-[2.2rem]">{s.title}</span>
                    <span className="mt-4 block max-w-xs text-sm leading-relaxed text-ivory/75">{s.text}</span>
                    <span className="mt-6 block h-px w-10 bg-champagne transition-all duration-700 group-hover:w-24" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* WHY GESCARD */}
      <section className="relative overflow-hidden bg-ivory py-24 text-burgundy sm:py-32 lg:py-40">
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading tone="light" eyebrow="Why Gescard" title="A More Personal Way to Explore UAE Real Estate." />
            <Reveal as="figure" variant="fade" delay={150} className="mt-10">
              <ResponsiveImage image="gescard/awards-display" alt="Gescard Akiki presenting the developer awards display at the RichKey Properties office" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[3/2] w-full object-cover" />
              <figcaption className="mt-3 text-xs text-burgundy/65">Gescard at the RichKey Properties office.</figcaption>
            </Reveal>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7 lg:pt-16">
            {principles.map((p, i) => (
              <Reveal as="li" key={p.title} delay={i * 120} className="border-t border-burgundy/15 py-10 first:border-t-0 first:pt-0 lg:first:pt-10 lg:first:border-t">
                <div className="flex gap-8">
                  <span className="font-serif text-5xl leading-none text-wine/80">0{i + 1}</span>
                  <div>
                    <h3 className="font-sans text-[0.8rem] font-semibold uppercase tracking-[0.26em]">{p.title}</h3>
                    <p className="mt-4 max-w-md signature text-[1.65rem] leading-snug text-burgundy/80">{p.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="bg-burgundy py-24 sm:py-32" aria-labelledby="featured-heading">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Featured Developments" title={<span id="featured-heading">Distinctive developments. Carefully selected.</span>} intro="Explore selected communities in Dubai and Abu Dhabi, chosen for their location, design and lifestyle offering." />
            {featured.length > 0 && <Reveal delay={100}><ButtonLink href="/properties/" variant="outline">View developments</ButtonLink></Reveal>}
          </div>
          <div className="mt-16">{featured.length ? <PropertyGrid items={featured} /> : <PropertiesEmptyState showViewAll />}</div>
        </div>
      </section>

      <DubaiFuture />
      <InstagramSection />
      <YouTubeSection />
      <FinalCta />
    </>
  );
}
