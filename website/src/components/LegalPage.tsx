import type { ReactNode } from "react";

export default function LegalPage({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <section className="bg-burgundy pb-16 pt-40 sm:pt-48">
        <div className="container-luxe">
          <p className="eyebrow text-champagne">{eyebrow}</p>
          <h1 className="mt-6 text-5xl leading-[1.05] text-ivory sm:text-7xl">{title}</h1>
          <p className="mt-6 text-sm text-ivory/55">Last updated: {updated}</p>
        </div>
      </section>
      <section className="bg-ivory py-20 sm:py-28">
        <div className="container-luxe">
          <div className="prose-legal max-w-3xl">{children}</div>
        </div>
      </section>
    </>
  );
}
