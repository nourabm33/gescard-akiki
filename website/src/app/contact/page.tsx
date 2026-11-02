import { Mail, MapPin, Phone } from "lucide-react";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { whatsappLink } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description: "Contact Gescard Akiki about UAE property investment, apartments and villas by WhatsApp, phone or email.",
  path: "/contact/",
});

export default function ContactPage() {
  const channels = [
    { icon: <WhatsAppIcon size={18} />, label: "WhatsApp", value: profile.whatsapp.display, href: whatsappLink(), external: true },
    { icon: <Phone size={17} strokeWidth={1.5} aria-hidden="true" />, label: "Telephone", value: profile.phone.display, href: `tel:${profile.phone.e164}` },
    { icon: <Mail size={17} strokeWidth={1.5} aria-hidden="true" />, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: <MapPin size={17} strokeWidth={1.5} aria-hidden="true" />, label: "Office", value: profile.address.full, href: profile.address.mapsUrl, external: true },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact & Consultation"
        title="Let's Find Your Next Opportunity."
        intro="Whether you're considering an investment, searching for an apartment or exploring villas in the UAE, get in touch with Gescard to discuss your requirements."
        image="stock/dubai-skyline"
      />
      <section className="bg-charcoal pb-28 pt-8 sm:pb-36">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-4">
            <h2 className="text-3xl text-ivory sm:text-4xl">{profile.name}</h2>
            <p className="mt-2 text-[0.68rem] uppercase tracking-[0.28em] text-gold">{profile.title}</p>
            <ul className="mt-10 divide-y divide-ivory/10 border-y border-ivory/10">
              {channels.map((c) => (
                <li key={c.label}>
                  <a href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex gap-5 py-5">
                    <span className="mt-0.5 text-gold">{c.icon}</span>
                    <span>
                      <span className="block text-[0.62rem] uppercase tracking-[0.26em] text-ivory/55">{c.label}</span>
                      <span className="mt-1.5 block text-ivory/90 transition-colors group-hover:text-gold">{c.value}</span>
                      {c.external && <span className="sr-only">(opens in a new tab)</span>}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex gap-3">
              <a href={profile.socials.instagram.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-ivory/20 px-4 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:border-gold hover:text-gold">
                <InstagramIcon size={16} /> Instagram<span className="sr-only"> (opens in a new tab)</span>
              </a>
              <a href={profile.socials.youtube.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border border-ivory/20 px-4 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-ivory/80 transition-colors hover:border-gold hover:text-gold">
                <YouTubeIcon size={16} /> YouTube<span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-8">
            <div className="border border-ivory/10 bg-charcoal-soft p-6 sm:p-10 lg:p-14">
              <p className="eyebrow text-gold">Enquiry</p>
              <h2 className="mb-10 mt-5 text-4xl leading-tight text-ivory sm:text-5xl">Let&rsquo;s discuss your goals.</h2>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
