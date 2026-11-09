import ButtonLink from "@/components/ButtonLink";
import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import ResponsiveImage from "@/components/ResponsiveImage";
import Reveal from "@/components/Reveal";
import { profile } from "@/data/profile";
import { testimonials } from "@/data/testimonials";
import { whatsappLink } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description: "Meet Gescard Akiki, Senior Property Consultant at RichKey Properties, and learn how he evaluates off-plan developments in Dubai and Abu Dhabi.",
  path: "/about/",
});

const approach = [
  { title: "Understanding your brief", text: "Every enquiry starts with a conversation about your goals, preferred locations, property type, timing and budget, whether you are investing or looking for a home." },
  { title: "Exploring suitable options", text: "Your requirements shape the search. Options are shortlisted around what matters to you, rather than presenting everything on the market." },
  { title: "Direct communication", text: "You speak with Gescard directly throughout the search, with clear answers to your questions and support as you consider each next step." },
];

export default function AboutPage() {
  const identity: { label: string; value: string }[] = [
    { label: "Name", value: profile.name },
    { label: "Professional title", value: profile.title },
    { label: "Speciality", value: profile.specialty },
    { label: "Agency", value: profile.agency.name },
    { label: "Office", value: profile.address.full },
    ...profile.credentials,
    ...(profile.languages.length ? [{ label: "Languages", value: profile.languages.join(", ") }] : []),
  ];

  return (
    <>
      <PageHero eyebrow="About Gescard" title="Meet Gescard Akiki." intro="Senior Property Consultant at RichKey Properties, specialising in off-plan homes in Dubai and Abu Dhabi." image="gescard/richkey-office" />

      <section className="bg-ivory py-24 text-burgundy sm:py-32">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal variant="fade" className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full border border-wine/30 sm:block" aria-hidden="true" />
              <Reveal variant="image" delay={100} className="relative overflow-hidden">
                <ResponsiveImage image="gescard/about-portrait" alt="Gescard Akiki in a dark suit and burgundy tie at the RichKey Properties office" sizes="(min-width: 1024px) 40vw, 100vw" className="aspect-[4/5] w-full object-cover object-[50%_58%]" />
              </Reveal>
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal variant="stagger">
              <p className="eyebrow text-wine">Introduction</p>
              <h2 className="mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl">Real Estate Is <em className="font-normal text-wine">Personal.</em></h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 space-y-5 text-lg leading-relaxed text-burgundy/75">
              {profile.biography.length ? (
                profile.biography.map((p) => <p key={p.slice(0, 24)}>{p}</p>)
              ) : (
                <>
                  <p>
                    Gescard advises buyers on off-plan homes in Dubai and Abu Dhabi. He begins with a conversation about where you want to live or invest, what you can commit to and when you need the home.
                  </p>
                  <p>
                    He looks closely at the developer, the masterplan and what is already in place around a project. The details that matter often sit outside the floor plan: the coastline, established schools, nearby jobs and the routes people use every day.
                  </p>
                  <p>
                    The shortlist reflects your priorities. Gescard helps you compare the homes, payment schedules and delivery milestones that fit your brief.
                  </p>
                </>
              )}
            </Reveal>
            <Reveal delay={200} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact/" variant="outline-dark">Connect with Gescard</ButtonLink>
              <ButtonLink href={whatsappLink()} variant="text-dark">Chat on WhatsApp</ButtonLink>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-burgundy py-24 sm:py-32" aria-labelledby="approach-heading">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow text-champagne">My Approach</p>
            <h2 id="approach-heading" className="mt-6 max-w-3xl text-[2.5rem] leading-[1.05] text-ivory sm:text-5xl lg:text-[3.6rem]">A property search shaped around your goals.</h2>
          </Reveal>
          <ol className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-3">
            {approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 120} className="bg-burgundy p-8 md:p-10">
                <span className="font-serif text-5xl text-champagne/80">0{i + 1}</span>
                <h3 className="mt-8 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-ivory">{a.title}</h3>
                <p className="mt-4 leading-relaxed text-ivory/65">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-burgundy py-28 sm:py-40" aria-labelledby="philosophy-heading">
        <div className="absolute inset-0 -z-10">
          <ResponsiveImage image="stock/dubai-night-boulevard" alt="" className="h-full w-full object-cover opacity-25" />
        </div>
        <div className="absolute inset-0 -z-10 bg-burgundy/60" aria-hidden="true" />
        <div className="container-luxe">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 id="philosophy-heading" className="eyebrow justify-center font-sans text-champagne">My Philosophy</h2>
            <blockquote className="mt-10">
              <p className="signature text-[2rem] leading-[1.25] text-ivory sm:text-5xl sm:leading-[1.2]">
                &ldquo;Real estate is more than choosing a property. It is about understanding the people behind every decision, recognising their priorities and exploring opportunities that match their ambitions.&rdquo;
              </p>
              <footer className="mt-10 text-[0.7rem] uppercase tracking-[0.32em] text-ivory/60">{profile.name}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 text-burgundy sm:py-32" aria-labelledby="identity-heading">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-wine">Professional Identity</p>
            <h2 id="identity-heading" className="mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl">At a glance.</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-burgundy/15 border-y border-burgundy/15">
              {identity.map((row) => (
                <div key={row.label} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-burgundy/60">{row.label}</dt>
                  <dd className="signature text-2xl leading-snug sm:col-span-2">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-burgundy py-24 sm:py-32" aria-labelledby="moments-heading">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow text-champagne">RichKey Properties</p>
            <h2 id="moments-heading" className="mt-6 max-w-3xl text-[2.5rem] leading-[1.05] text-ivory sm:text-5xl">Behind the advisory.</h2>
            <p className="mt-6 max-w-2xl leading-relaxed text-ivory/75">Gescard works with RichKey Properties, a Dubai brokerage with an off-plan property team. The photos show Gescard at the office awards display and the RichKey team at Emaar’s Quarter 1 Broker Awards 2026.</p>
            <ButtonLink href="https://richkey.ae/" variant="text" className="mt-4">Visit RichKey Properties</ButtonLink>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Reveal as="figure" variant="fade" className="md:col-span-2">
              <ResponsiveImage image="gescard/richkey-awards" alt="Gescard Akiki beside the RichKey Properties trophy display" sizes="(min-width: 1320px) 1224px, 100vw" className="aspect-[3/2] w-full object-cover brightness-[1.1] saturate-[0.92]" />
              <figcaption className="mt-3 text-sm text-ivory/70">At the RichKey Properties office.</figcaption>
            </Reveal>
            <Reveal variant="image" from="left" className="md:row-span-2">
              <ResponsiveImage image="gescard/emaar-awards-team-group" alt="Gescard Akiki and the RichKey Properties team at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
            </Reveal>
            <Reveal variant="image" from="right" delay={150}>
              <ResponsiveImage image="gescard/emaar-awards-team-stage" alt="The RichKey Properties team on stage at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
            </Reveal>
            <Reveal variant="image" from="right" delay={300}>
              <ResponsiveImage image="gescard/emaar-awards-duo" alt="Gescard Akiki with a RichKey Properties colleague at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-ivory/55">Emaar Quarter 1 Broker Awards 2026, Dubai.</p>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-ivory py-24 text-burgundy sm:py-32" aria-labelledby="testimonials-heading">
          <div className="container-luxe">
            <h2 id="testimonials-heading" className="text-[2.5rem] sm:text-5xl">Client words.</h2>
            <ul className="mt-12 grid gap-8 md:grid-cols-2">
              {testimonials.map((t) => (
                <li key={t.name} className="border-t border-burgundy/15 pt-8">
                  <blockquote className="signature text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="mt-5 text-[0.7rem] uppercase tracking-[0.24em] text-burgundy/60">{t.name}{t.context ? ` · ${t.context}` : ""}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FinalCta />
    </>
  );
}
