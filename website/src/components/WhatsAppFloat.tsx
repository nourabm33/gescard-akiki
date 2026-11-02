import { whatsappLink } from "@/lib/enquiry";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gescard on WhatsApp (opens in a new tab)"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 bg-charcoal/95 px-4 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ivory opacity-0 shadow-lg ring-1 ring-gold/25 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-charcoal text-gold shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] ring-1 ring-gold/50 transition-all duration-500 group-hover:bg-gold group-hover:text-charcoal">
        <span className="absolute inset-0 rounded-full ring-1 ring-gold/40 motion-safe:animate-ping [animation-duration:3s]" aria-hidden="true" />
        <WhatsAppIcon size={24} />
      </span>
    </a>
  );
}
