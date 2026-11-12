import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { InstagramIcon, YouTubeIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { properties } from "@/data/properties";
import { whatsappLink } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Book a consultation with Gescard Akiki for off-plan property in Dubai and Abu Dhabi. Contact him by WhatsApp, phone or email.",
  path: "/contact/",
});

export default function ContactPage() {
  const channels = [
    { label: "WhatsApp", value: profile.whatsapp.display, href: whatsappLink(), external: true },
    { label: "Telephone", value: profile.phone.display, href: `tel:${profile.phone.e164}` },
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Office", value: profile.address.full, href: profile.address.mapsUrl, external: true },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact & Consultation"
        title="Let's Find Your Next Opportunity."
        intro="Tell Gescard what you’re looking for in Dubai or Abu Dhabi. Share your preferred location, budget and timing to start a consultation."
        image="stock/dubai-skyline"
        videoClip="lobby-walk"
      />
      <section className="bg-burgundy pb-28 pt-8 sm:pb-36">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl text-ivory sm:text-4xl">{profile.name}</h2>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-champagne">{profile.title}</p>
            <p className="mt-4 text-sm text-ivory/85">{profile.agency.registeredName}</p>
            <a href={profile.registrationUrl} className="mt-2 inline-block text-sm text-champagne underline underline-offset-4">Verify Dubai broker registration</a>
            <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group block py-5">
                    <span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.26em] text-ivory/55">{c.label}</span>
                      <span className="mt-1.5 block text-ivory/90 transition-colors group-hover:text-champagne">{c.value}</span>
                      {c.external && <span className="sr-only">(opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={profile.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-ivory/20 px-4 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:border-champagne hover:text-champagne">
                <InstagramIcon size={16} /> Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={profile.socials.youtube.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-ivory/20 px-4 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:border-champagne hover:text-champagne">
                <YouTubeIcon size={16} /> YouTube<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <div id="enquiry" className="scroll-mt-24 border border-ivory/10 bg-burgundy-soft p-6 sm:p-10 lg:p-14">
              <p className="eyebrow text-champagne">Enquiry</p>
              <h2 className="mb-10 mt-5 text-4xl leading-tight text-ivory sm:text-5xl">Let&rsquo;s discuss your goals.</h2>
              <Suspense fallback={null}>
                <ContactForm projects={properties.map(({ slug, title }) => ({ slug, title }))} />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
