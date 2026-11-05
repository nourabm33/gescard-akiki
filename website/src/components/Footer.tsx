import Link from "next/link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { InstagramIcon, YouTubeIcon } from "./icons";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-champagne/15 bg-charcoal text-ivory">
      <div className="container-luxe grid gap-14 py-20 md:grid-cols-12 lg:py-24">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-8 max-w-sm signature text-2xl leading-snug text-ivory/85">
            Personalised guidance for UAE property investment, apartments and villas.
          </p>
          <div className="mt-8 flex gap-3">
            <a href={profile.socials.instagram.url} target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-[color,border-color,transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 hover:text-champagne">
              <InstagramIcon size={18} />
            </a>
            <a href={profile.socials.youtube.url} target="_blank" rel="noopener noreferrer" aria-label="YouTube (opens in a new tab)" className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/20 text-ivory/80 transition-[color,border-color,transform,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-champagne hover:bg-champagne/10 hover:text-champagne">
              <YouTubeIcon size={18} />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="md:col-span-3">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-champagne">Navigate</p>
          <ul className="mt-6 space-y-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-line text-[0.75rem] uppercase tracking-[0.22em] text-ivory/75 transition-colors hover:text-champagne">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <p className="text-[0.65rem] font-medium uppercase tracking-[0.3em] text-champagne">Contact</p>
          <ul className="mt-6 space-y-3 text-[0.95rem] text-ivory/80">
            <li>
              <a href={`mailto:${profile.email}`} className="link-line transition-colors hover:text-champagne">{profile.email}</a>
            </li>
            <li>
              <a href={`tel:${profile.phone.e164}`} className="link-line transition-colors hover:text-champagne">{profile.phone.display}</a>
            </li>
            <li className="pt-3">
              <a href={profile.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="not-italic leading-relaxed text-ivory/65 transition-colors hover:text-champagne">
                {profile.address.full}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-luxe py-8 text-xs leading-relaxed text-ivory/55">
          <p className="max-w-4xl">
            Property information on this website is provided for general information only and does not constitute an offer, a contract or financial, legal or tax advice. Availability, prices and specifications are subject to change and must be confirmed directly before any decision. {profile.name} is a property advisor with {profile.agency.name} and is not a licensed financial or legal adviser.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {year} {profile.name}. All rights reserved.
            </p>
            <ul className="flex gap-6">
              <li><Link href="/privacy-policy/" className="link-line hover:text-champagne">Privacy Policy</Link></li>
              <li><Link href="/terms/" className="link-line hover:text-champagne">Terms and Conditions</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
