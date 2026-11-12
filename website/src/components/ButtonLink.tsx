import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

type Variant = "gold" | "outline" | "outline-dark" | "text" | "text-dark";

const base =
  "group/btn inline-flex items-center justify-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.24em] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]";

const variants: Record<Variant, string> = {
  gold: "btn-sweep bg-champagne px-7 py-4 text-burgundy [--sweep:var(--color-ivory)]",
  outline: "btn-sweep border border-ivory/35 px-7 py-4 text-ivory [--sweep:rgba(229,193,143,0.12)] hover:border-champagne hover:text-champagne",
  "outline-dark": "btn-sweep border border-burgundy/30 px-7 py-4 text-burgundy [--sweep:var(--color-burgundy)] hover:border-burgundy hover:text-ivory",
  text: "py-2 text-champagne hover:text-ivory",
  "text-dark": "py-2 text-burgundy hover:text-wine",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
  icon?: ReactNode;
  ariaLabel?: string;
  enquiryChannel?: "form" | "whatsapp" | "email";
};

export default function ButtonLink({ href, children, variant = "gold", className = "", external, icon, ariaLabel, enquiryChannel }: Props) {
  const content = (
    <>
      {icon}
      <span className={variant.startsWith("text") ? "link-line" : undefined}>{children}</span>
      {!icon && (
        <span className="arrow-swap" aria-hidden="true">
          <ArrowUpRight size={15} strokeWidth={1.5} />
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </span>
      )}
    </>
  );
  const cls = `${base} ${variants[variant]} ${className}`;
  const isExternal = external ?? /^(https?:|mailto:|tel:)/.test(href);
  if (isExternal) {
    const newTab = href.startsWith("http");
    return (
      <a href={href} className={cls} aria-label={ariaLabel} data-project-enquiry={enquiryChannel} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel} data-project-enquiry={enquiryChannel}>
      {content}
    </Link>
  );
}
