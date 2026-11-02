import { mailtoLink, whatsappLink } from "@/lib/enquiry";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import ResponsiveImage from "./ResponsiveImage";
import { WhatsAppIcon } from "./icons";

type Props = { showViewAll?: boolean };

export default function PropertiesEmptyState({ showViewAll = false }: Props) {
  const message = "Hello Gescard, I'd like to receive current property opportunities in the UAE. Here is what I'm looking for:";
  return (
    <Reveal variant="fade" className="grid overflow-hidden border border-gold/20 bg-charcoal-soft lg:grid-cols-2">
      <Reveal variant="image" from="left" delay={150} className="relative min-h-[280px] lg:min-h-[460px]">
        <ResponsiveImage image="stock/dubai-tower-detail" alt="Architectural detail of a Dubai skyscraper at dusk" sizes="(min-width: 1024px) 50vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-r from-transparent to-charcoal-soft/40" aria-hidden="true" />
      </Reveal>
      <Reveal variant="stagger" delay={300} className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
        <p className="eyebrow text-gold">Current Opportunities</p>
        <h3 className="mt-5 text-4xl leading-tight text-ivory sm:text-[2.8rem]">Selected listings, shared on request.</h3>
        <p className="mt-6 max-w-md leading-relaxed text-ivory/70">
          Curated listings will be published here. For current availability, share your requirements (location, property type and budget) and receive options suited to your brief directly from Gescard.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          <ButtonLink href={whatsappLink(message)} icon={<WhatsAppIcon size={17} />}>Request opportunities</ButtonLink>
          {showViewAll ? (
            <ButtonLink href="/properties/" variant="outline">View all properties</ButtonLink>
          ) : (
            <ButtonLink href={mailtoLink("Property opportunities in the UAE")} variant="outline">Email Gescard</ButtonLink>
          )}
        </div>
      </Reveal>
    </Reveal>
  );
}
