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
  description: "Meet Gescard Akiki, Dubai real estate consultant with RichKey Properties, and his personal approach to property investment, apartments and villas in Dubai.",
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
    { label: "Agency", value: profile.agency.relationship },
    { label: "Office", value: profile.address.full },
    ...profile.credentials,
    ...(profile.languages.length ? [{ label: "Languages", value: profile.languages.join(", ") }] : []),
  ];

  return (
    <>
      <PageHero eyebrow="About Gescard" title="Meet Gescard Akiki." intro="A Dubai real estate consultant with RichKey Properties, focused on understanding people before properties." image="stock/burj-al-arab-coast" />

      <section className="bg-ivory py-24 text-charcoal sm:py-32">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-4 -top-4 hidden h-full w-full border border-gold-deep/30 sm:block" aria-hidden="true" />
              <ResponsiveImage image="gescard/gescard-portrait" alt="Portrait of Gescard Akiki in a black tuxedo at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 1024px) 40vw, 100vw" className="relative aspect-[4/5] w-full object-cover object-top" />
            </div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="eyebrow text-gold-deep">Introduction</p>
              <h2 className="mt-6 text-[2.6rem] leading-[1.04] sm:text-6xl">Real Estate Is <em className="font-normal text-gold-deep">Personal.</em></h2>
            </Reveal>
            <Reveal delay={120} className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/75">
              {profile.biography.length ? (
                profile.biography.map((p) => <p key={p.slice(0, 24)}>{p}</p>)
              ) : (
                <>
                  <p>
                    Gescard Akiki is a Dubai real estate professional working with {profile.agency.name}. His approach is centred on understanding each client&rsquo;s individual requirements and helping them explore properties that fit their goals.
                  </p>
                  <p>
                    Whether you are considering a property investment, an apartment or a villa, the search is tailored to you: your priorities, your preferred communities and the way you want to live or invest in Dubai.
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

      <section className="bg-charcoal py-24 sm:py-32" aria-labelledby="approach-heading">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow text-gold">My Approach</p>
            <h2 id="approach-heading" className="mt-6 max-w-3xl text-[2.5rem] leading-[1.05] text-ivory sm:text-5xl lg:text-[3.6rem]">A property search shaped around your goals.</h2>
          </Reveal>
          <ol className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-3">
            {approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 120} className="bg-charcoal p-8 md:p-10">
                <span className="font-serif text-5xl text-gold/80">0{i + 1}</span>
                <h3 className="mt-8 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.26em] text-ivory">{a.title}</h3>
                <p className="mt-4 leading-relaxed text-ivory/65">{a.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-charcoal py-28 sm:py-40" aria-labelledby="philosophy-heading">
        <div className="absolute inset-0 -z-10">
          <ResponsiveImage image="stock/dubai-night-boulevard" alt="" className="h-full w-full object-cover opacity-25" />
        </div>
        <div className="absolute inset-0 -z-10 bg-charcoal/60" aria-hidden="true" />
        <div className="container-luxe">
          <Reveal className="mx-auto max-w-4xl text-center">
            <h2 id="philosophy-heading" className="eyebrow justify-center font-sans text-gold">My Philosophy</h2>
            <blockquote className="mt-10">
              <p className="font-serif text-[2rem] italic leading-[1.25] text-ivory sm:text-5xl sm:leading-[1.2]">
                &ldquo;Real estate is more than choosing a property. It is about understanding the people behind every decision, recognising their priorities and exploring opportunities that match their ambitions.&rdquo;
              </p>
              <footer className="mt-10 text-[0.7rem] uppercase tracking-[0.32em] text-ivory/60">{profile.name}</footer>
            </blockquote>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 text-charcoal sm:py-32" aria-labelledby="identity-heading">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow text-gold-deep">Professional Identity</p>
            <h2 id="identity-heading" className="mt-6 text-[2.5rem] leading-[1.05] sm:text-5xl">At a glance.</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            <dl className="divide-y divide-charcoal/15 border-y border-charcoal/15">
              {identity.map((row) => (
                <div key={row.label} className="grid gap-2 py-6 sm:grid-cols-3 sm:gap-6">
                  <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-charcoal/60">{row.label}</dt>
                  <dd className="font-serif text-2xl leading-snug sm:col-span-2">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="bg-charcoal py-24 sm:py-32" aria-labelledby="moments-heading">
        <div className="container-luxe">
          <Reveal>
            <p className="eyebrow text-gold">Moments</p>
            <h2 id="moments-heading" className="mt-6 max-w-3xl text-[2.5rem] leading-[1.05] text-ivory sm:text-5xl">With the RichKey Properties team.</h2>
          </Reveal>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <Reveal className="md:row-span-2">
              <figure className="h-full">
                <ResponsiveImage image="gescard/emaar-awards-team-group" alt="Gescard Akiki and the RichKey Properties team at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 768px) 50vw, 100vw" className="h-full w-full object-cover" />
              </figure>
            </Reveal>
            <Reveal delay={120}>
              <ResponsiveImage image="gescard/emaar-awards-team-stage" alt="The RichKey Properties team on stage at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
            </Reveal>
            <Reveal delay={200}>
              <ResponsiveImage image="gescard/emaar-awards-duo" alt="Gescard Akiki with a RichKey Properties colleague at the Emaar Quarter 1 Broker Awards 2026" sizes="(min-width: 768px) 50vw, 100vw" className="aspect-[3/2] w-full object-cover" />
            </Reveal>
          </div>
          <p className="mt-6 text-sm text-ivory/55">Emaar Quarter 1 Broker Awards 2026, Dubai.</p>
        </div>
      </section>

      {testimonials.length > 0 && (
        <section className="bg-ivory py-24 text-charcoal sm:py-32" aria-labelledby="testimonials-heading">
          <div className="container-luxe">
            <h2 id="testimonials-heading" className="text-[2.5rem] sm:text-5xl">Client words.</h2>
            <ul className="mt-12 grid gap-8 md:grid-cols-2">
              {testimonials.map((t) => (
                <li key={t.name} className="border-t border-charcoal/15 pt-8">
                  <blockquote className="font-serif text-2xl italic leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
                  <p className="mt-5 text-[0.7rem] uppercase tracking-[0.24em] text-charcoal/60">{t.name}{t.context ? ` · ${t.context}` : ""}</p>
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
