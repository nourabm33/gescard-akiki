"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { whatsappLink } from "@/lib/enquiry";
import { InstagramIcon, WhatsAppIcon, YouTubeIcon } from "./icons";
import Logo from "./Logo";

function isActive(pathname: string, href: string) {
  const clean = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  return target === "/" ? clean === "/" : clean === target || clean.startsWith(`${target}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    close();
  }, [pathname, close]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const first = menuRef.current?.querySelector<HTMLElement>("a");
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && menuRef.current) {
        const items = [toggleRef.current, ...menuRef.current.querySelectorAll<HTMLElement>("a")].filter(Boolean) as HTMLElement[];
        const idx = items.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey && idx <= 0) {
          e.preventDefault();
          items[items.length - 1].focus();
        } else if (!e.shiftKey && idx === items.length - 1) {
          e.preventDefault();
          items[0].focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`header-in fixed inset-x-0 top-0 z-50 transition-[background-color,padding,box-shadow,backdrop-filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid ? "bg-charcoal/92 py-3.5 shadow-[0_1px_0_rgba(195,164,119,0.14)] backdrop-blur-md" : "bg-transparent py-6 lg:py-8"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-gold focus:px-4 focus:py-2 focus:text-charcoal">
        Skip to content
      </a>
      <div className="container-luxe flex items-center justify-between gap-6">
        <Logo onNavigate={close} />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-gold after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      active ? "text-gold after:origin-left after:scale-x-100" : "text-ivory/80 after:origin-right after:scale-x-0 hover:text-ivory hover:after:origin-left hover:after:scale-x-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/contact/"
            className="btn-sweep hidden border border-gold/60 px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.26em] text-gold transition-colors duration-500 [--sweep:var(--color-gold)] hover:text-charcoal lg:inline-block"
          >
            Let&rsquo;s Talk
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`absolute h-px w-7 bg-ivory transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
            <span className={`absolute h-px bg-gold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "w-7 -rotate-45 bg-ivory" : "w-5 translate-x-1 translate-y-[5px]"}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-0 top-0 -z-10 flex h-[100dvh] flex-col bg-charcoal px-6 pb-10 pt-28 transition-[opacity,visibility,clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-8 lg:hidden ${
          open ? "visible opacity-100 [clip-path:inset(0_0_0_0)]" : "invisible opacity-0 [clip-path:inset(0_0_100%_0)]"
        }`}
      >
        <nav aria-label="Mobile" className="flex-1">
          <ul className="space-y-1">
            {navigation.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={close}
                    tabIndex={open ? 0 : -1}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-4 py-2 font-serif text-[2.6rem] leading-tight ${active ? "text-gold" : "text-ivory"}`}
                  >
                    <span className="font-sans text-[0.65rem] tracking-[0.2em] text-gold/80">0{i + 1}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div
          className={`space-y-6 transition-all delay-500 duration-700 ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
        >
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="flex w-full items-center justify-center gap-3 bg-gold px-6 py-4 text-[0.72rem] font-medium uppercase tracking-[0.24em] text-charcoal"
          >
            <WhatsAppIcon size={18} /> Chat on WhatsApp
          </a>
          <div className="flex items-center justify-between text-sm text-ivory/70">
            <a href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1} className="hover:text-gold">
              {profile.email}
            </a>
            <div className="flex gap-5">
              <a href={profile.socials.instagram.url} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} aria-label="Instagram (opens in a new tab)" className="hover:text-gold">
                <InstagramIcon />
              </a>
              <a href={profile.socials.youtube.url} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} aria-label="YouTube (opens in a new tab)" className="hover:text-gold">
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
