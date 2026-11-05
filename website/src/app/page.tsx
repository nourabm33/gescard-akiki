import Link from "next/link";
import ButtonLink from "@/components/ButtonLink";
import FinalCta from "@/components/FinalCta";
import InstagramSection from "@/components/InstagramSection";
import PropertiesEmptyState from "@/components/PropertiesEmptyState";
import PropertyGrid from "@/components/PropertyGrid";
import ResponsiveImage from "@/components/ResponsiveImage";
import Parallax from "@/components/Parallax";
import Reveal from "@/components/Reveal";
import SplitWords from "@/components/SplitWords";
import SectionHeading from "@/components/SectionHeading";
import VideoCard from "@/components/VideoCard";
import { YouTubeIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { getFeaturedProperties } from "@/data/properties";
import { principles, serviceHighlights } from "@/data/services";
import { longVideos, shortVideos } from "@/data/videos";

export default function HomePage() {
  const featured = getFeaturedProperties(3);
  const featuredVideo = longVideos[0];
  const previewShorts = shortVideos.slice(0, 3);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-burgundy lg:min-h-[100svh]">
        <Parallax className="absolute inset-0 -z-20">
          <div className="hero-bg h-full w-full">
            <ResponsiveImage image="stock/dubai-skyline" alt="" priority className="h-full w-full object-cover object-[60%_center] opacity-25" />
          </div>
        </Parallax>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_72%_48%,rgba(140,39,79,0.5),rgba(48,7,25,0.9)_62%)]" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-burgundy via-burgundy/80 to-transparent" aria-hidden="true" />

        <div className="container-luxe grid min-h-[100svh] grid-rows-[auto_1fr] pt-28 lg:grid-cols-12 lg:grid-rows-1 lg:pt-0">
          {/* Portrait */}
          <div className="relative order-1 mx-auto flex w-full max-w-[420px] items-end justify-center sm:max-w-[480px] lg:order-2 lg:col-span-5 lg:col-start-8 lg:max-w-none lg:self-end">
            <div className="hero-halo absolute bottom-[8%] left-1/2 aspect-square w-[88%] -translate-x-1/2 rounded-full border border-champagne/25 lg:bottom-[14%]" aria-hidden="true" />
            <ResponsiveImage
              image="gescard/gescard-portrait-cutout"
              alt="Gescard Akiki, UAE property advisor, smiling in a black tuxedo"
              priority
              sizes="(min-width: 1024px) 42vw, 90vw"
              className="hero-portrait relative max-h-[52svh] w-auto object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_78%,transparent)] lg:max-h-[88vh]"
            />
          </div>

          {/* Copy */}
          <div className="relative order-2 -mt-16 flex flex-col justify-center pb-24 lg:order-1 lg:col-span-7 lg:mt-0 lg:pb-16 lg:pt-32">
            <p className="hero-rise eyebrow text-champagne">Private Property Advisory</p>
            <h1 className="mt-6 text-[2.35rem] leading-[1.08] text-ivory sm:text-6xl lg:text-[4.2rem] xl:text-[4.8rem]">
              <SplitWords segments={["Your Next Move in the UAE", { text: "Starts Here.", em: true }]} delay={150} />
            </h1>
            <p className="hero-rise signature mt-6 text-2xl text-champagne sm:text-[1.7rem]" style={{ "--d": "700ms" } as React.CSSProperties}>
              Vision. Value. Trust.
            </p>
            <p className="hero-rise mt-6 max-w-lg text-base leading-relaxed text-ivory/75 sm:text-lg" style={{ "--d": "780ms" } as React.CSSProperties}>
              Private property advisory for buyers and investors in the UAE, with carefully selected opportunities and a personal approach at every step.
            </p>
            <div className="hero-rise mt-10 flex flex-col gap-4 sm:flex-row" style={{ "--d": "880ms" } as React.CSSProperties}>
              <ButtonLink href="/properties/">Explore Properties</ButtonLink>
              <ButtonLink href="/contact/" variant="outline">Connect with Gescard</ButtonLink>
            </div>
            <p className="hero-rise mt-12 text-[0.68rem] uppercase tracking-[0.28em] text-ivory/50" style={{ "--d": "1000ms" } as React.CSSProperties}>
              {profile.title} &middot; {profile.agency.name}
            </p>
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
            <Reveal variant="image" from="left" delay={150} className="mt-12 hidden overflow-hidden lg:block">
              <ResponsiveImage image="gescard/emaar-awards-duo" alt="Gescard Akiki with a RichKey Properties colleague at the Emaar Quarter 1 Broker Awards 2026" sizes="40vw" className="aspect-[4/3] w-full object-cover" />
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
            <SectionHeading eyebrow="Properties" title={<span id="featured-heading">Discover Selected Properties in the UAE.</span>} intro="Explore a curated selection of apartments, villas and property opportunities." />
            {featured.length > 0 && <Reveal delay={100}><ButtonLink href="/properties/" variant="outline">View all properties</ButtonLink></Reveal>}
          </div>
          <div className="mt-16">{featured.length ? <PropertyGrid items={featured} /> : <PropertiesEmptyState showViewAll />}</div>
        </div>
      </section>

      {/* INSIGHTS PREVIEW */}
      <section className="border-t border-ivory/5 bg-burgundy-soft py-24 sm:py-32" aria-labelledby="insights-heading">
        <div className="container-luxe">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Insights" title={<span id="insights-heading">Discover the UAE Through My Perspective.</span>} intro="Explore property tours, UAE real estate content and insights through Gescard's videos." />
            <Reveal delay={100}><ButtonLink href="/insights/" variant="outline">Explore my videos</ButtonLink></Reveal>
          </div>
          <div className="mt-16 grid gap-10 lg:grid-cols-12 lg:gap-8">
            {featuredVideo && (
              <Reveal className="lg:col-span-6"><VideoCard video={featuredVideo} large /></Reveal>
            )}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-6 lg:gap-6">
              {previewShorts.map((v, i) => (
                <Reveal key={v.id} delay={i * 110} className={i === 2 ? "hidden sm:block" : ""}><VideoCard video={v} /></Reveal>
              ))}
            </div>
          </div>
          <Reveal className="mt-14 flex flex-col items-start gap-4 border-t border-ivory/10 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-md text-sm text-ivory/60">New property tours and market content are published on YouTube.</p>
            <ButtonLink href={profile.socials.youtube.subscribeUrl} variant="gold" icon={<YouTubeIcon size={17} />}>Subscribe on YouTube</ButtonLink>
          </Reveal>
        </div>
      </section>

      <InstagramSection />
      <FinalCta />
    </>
  );
}
