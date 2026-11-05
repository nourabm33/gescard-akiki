import Link from "next/link";
import { profile } from "@/data/profile";

export default function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" onClick={onNavigate} className="group flex flex-col leading-none" aria-label={`${profile.name}, home`}>
      <span className="font-serif text-[1.35rem] font-medium tracking-[0.2em] text-champagne sm:text-2xl">{profile.brand}</span>
      <span className="mt-1.5 text-[0.56rem] font-medium uppercase tracking-[0.42em] text-ivory/80">UAE Property Advisor</span>
    </Link>
  );
}
