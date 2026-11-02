import ButtonLink from "@/components/ButtonLink";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import ResponsiveImage from "@/components/ResponsiveImage";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Expertise",
  description: "UAE property investment guidance, apartments and villas, and a personalised property search with Gescard Akiki.",
  path: "/expertise/",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHero eyebrow="Expertise" title="UAE Real Estate, Tailored to Your Goals." intro="Three ways to begin, each built around your objectives, preferences and budget." image="stock/downtown-dubai" />

      <section className="bg-ivory text-charcoal">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={s.id} id={s.id} className="border-b border-charcoal/10 py-20 sm:py-28 last:border-b-0">
              <div className="container-luxe grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                <Reveal variant="image" from={flip ? "right" : "left"} className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <div className="img-zoom overflow-hidden">
                    <ResponsiveImage image={s.image} alt={s.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]" />
                  </div>
                </Reveal>
                <Reveal variant="stagger" delay={200} className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <p className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-gold-deep">
                    <span className="font-serif text-4xl tracking-normal">{s.number}</span> Service · {s.label}
                  </p>
                  <h2 className="mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.4rem]">{s.title}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-charcoal/75">{s.text}</p>
                  <div className="mt-10">
                    <ButtonLink href={s.cta.href} variant="outline-dark">{s.cta.label}</ButtonLink>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      <section className="bg-charcoal py-14">
        <div className="container-luxe">
          <p className="max-w-3xl text-sm leading-relaxed text-ivory/55">
            Gescard provides real estate consultancy. He does not provide financial, mortgage, legal or tax advice, and no investment return is guaranteed. Please seek independent professional advice before making any investment decision.
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
