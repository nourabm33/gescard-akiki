import { whatsappLink } from "@/lib/enquiry";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Gescard on WhatsApp (opens in a new tab)"
      className="float-in group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="pointer-events-none hidden translate-x-2 bg-burgundy/95 px-4 py-2.5 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-ivory opacity-0 ring-1 ring-champagne/25 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 md:block">
        Chat on WhatsApp
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-champagne ring-1 ring-champagne/50 transition-[background-color,color,transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-0.5 group-hover:bg-champagne group-hover:text-burgundy">
        <span className="absolute -inset-1.5 rounded-full ring-1 ring-champagne/0 transition-[box-shadow,transform] duration-700 group-hover:scale-105 group-hover:ring-champagne/35" aria-hidden="true" />
        <WhatsAppIcon size={24} />
      </span>
    </a>
  );
}
