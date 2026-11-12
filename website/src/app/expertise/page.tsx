import ButtonLink from "@/components/ButtonLink";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import ResponsiveImage from "@/components/ResponsiveImage";
import Reveal from "@/components/Reveal";
import { services } from "@/data/services";
import { buyerQuestions, dubaiAdvertising, dubaiRest } from "@/data/buyer-guidance";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Expertise",
  description: "UAE property investment guidance, apartments and villas, and a personalised property search with Gescard Akiki.",
  path: "/expertise/",
});

export default function ExpertisePage() {
  return (
    <>
      <PageHero eyebrow="Expertise" title="UAE Real Estate, Tailored to Your Goals." intro="Three ways to begin, each built around your objectives, preferences and budget." image="stock/downtown-dubai" videoClip="city-walk" />

      <section className="bg-ivory text-burgundy">
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={s.id} id={s.id} className="border-b border-burgundy/10 py-20 sm:py-28 last:border-b-0">
              <div className="container-luxe grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
                <Reveal variant="image" from={flip ? "right" : "left"} className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                  <div className="img-zoom overflow-hidden">
                    <ResponsiveImage image={s.image} alt={s.alt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover sm:aspect-[5/4]" />
                  </div>
                </Reveal>
                <Reveal variant="stagger" delay={200} className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}>
                  <p className="flex items-center gap-4 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-wine">
                    <span className="font-serif text-4xl tracking-normal">{s.number}</span> Service · {s.label}
                  </p>
                  <h2 className="mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.4rem]">{s.title}</h2>
                  <p className="mt-6 text-lg leading-relaxed text-burgundy/75">{s.text}</p>
                  <p className="mt-4 leading-relaxed text-burgundy/75">{s.comparison}</p>
                  <div className="mt-10">
                    <ButtonLink href={s.cta.href} variant="outline-dark">{s.cta.label}</ButtonLink>
                  </div>
                </Reveal>
              </div>
            </article>
          );
        })}
      </section>

      <section id="buyer-questions" className="scroll-mt-24 bg-ivory pb-20 text-burgundy sm:pb-28" aria-labelledby="buyer-questions-heading">
        <div className="container-luxe grid gap-8 border-t border-burgundy/15 pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 id="buyer-questions-heading" className="text-4xl sm:text-5xl">Off-plan buyer questions</h2>
            <p className="mt-5 leading-relaxed text-burgundy/75">What to ask before choosing a development, reviewing a payment schedule or making a reservation.</p>
          </div>
          <div className="divide-y divide-burgundy/15 border-y border-burgundy/15 lg:col-span-8">
            {buyerQuestions.map(({ question, answer, link }) => (
              <details key={question} className="py-4">
                <summary className="cursor-pointer py-2 font-semibold text-wine">{question}</summary>
                <p className="mt-3 max-w-3xl leading-relaxed text-burgundy/80">{answer}</p>
                {link && <a href={link.href} className="mt-3 inline-block text-sm font-medium text-wine underline underline-offset-4">{link.text}</a>}
              </details>
            ))}
            <p className="flex flex-wrap gap-x-5 gap-y-2 py-5 text-sm text-wine">
              <a href={dubaiRest} className="underline underline-offset-4">Dubai REST</a>
              <a href={dubaiAdvertising} className="underline underline-offset-4">Dubai Madmoun QR codes</a>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-burgundy py-14">
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
