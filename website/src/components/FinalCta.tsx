import { whatsappLink } from "@/lib/enquiry";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import ResponsiveImage from "./ResponsiveImage";
import { WhatsAppIcon } from "./icons";

type Props = { title?: string; text?: string };

export default function FinalCta({
  title = "Your UAE Property Journey Starts With a Conversation.",
  text = "Tell Gescard what you are looking for and begin exploring the right opportunities for your goals.",
}: Props) {
  return (
    <section className="relative isolate overflow-hidden bg-charcoal py-28 sm:py-36">
      <div className="absolute inset-0 -z-10">
        <ResponsiveImage image="stock/dubai-skyline" alt="" className="h-full w-full object-cover opacity-30" />
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-charcoal via-charcoal/60 to-charcoal" aria-hidden="true" />
      <div className="container-luxe text-center">
        <Reveal variant="stagger">
          <p className="eyebrow justify-center text-gold">Let&rsquo;s Talk</p>
          <h2 className="mx-auto mt-6 max-w-4xl text-[2.6rem] leading-[1.05] text-ivory sm:text-6xl lg:text-7xl">{title}</h2>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-ivory/70 sm:text-lg">{text}</p>
          <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="/contact/">Let&rsquo;s Talk</ButtonLink>
            <ButtonLink href={whatsappLink()} variant="outline" icon={<WhatsAppIcon size={17} />}>
              Chat on WhatsApp
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
