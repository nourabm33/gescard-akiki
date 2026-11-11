import { Bath, BedDouble, Check, Mail, MapPin, Maximize2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyGrid from "@/components/PropertyGrid";
import Reveal from "@/components/Reveal";
import { WhatsAppIcon } from "@/components/icons";
import { formatAED, getProperty, getSimilarProperties, properties, statusLabels } from "@/data/properties";
import { mailtoLink, whatsappLink } from "@/lib/enquiry";
import { pageMetadata } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site";

// Static export needs at least one path; while no listings exist a single placeholder
// path is generated and renders the 404 page.
const EMPTY_PLACEHOLDER = "coming-soon";

export const dynamicParams = false;

export function generateStaticParams() {
  return properties.length ? properties.map((p) => ({ slug: p.slug })) : [{ slug: EMPTY_PLACEHOLDER }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return { title: "Property not found", robots: { index: false } };
  return pageMetadata({
    title: property.title,
    description: property.development ? property.shortDescription : `${property.title}, ${property.location}. ${formatAED(property.priceAED)}. ${property.shortDescription}`,
    path: `/properties/${property.slug}/`,
    image: property.images[0]?.src,
    imageAlt: property.images[0]?.alt,
  });
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property);
  const development = property.development;
  const pageUrl = absoluteUrl(`/properties/${property.slug}/`);
  const enquiry = development?.enquiry ? `${development.enquiry} ${pageUrl}` : `Hello Gescard, I'm interested in "${property.title}" (${property.location}) on your website: ${pageUrl}`;
  const specs = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Maximize2, label: "Size", value: property.sizeSqft !== undefined ? `${property.sizeSqft.toLocaleString("en-US")} sq ft` : undefined },
  ].filter((s) => s.value !== undefined);

  return (
    <>
      <section className="bg-burgundy pb-20 pt-32 sm:pt-40">
        <div className="container-luxe">
          <nav aria-label="Breadcrumb" className="text-[0.68rem] uppercase tracking-[0.24em] text-ivory/55">
            <Link href="/properties/" className="hover:text-champagne">Developments</Link> <span aria-hidden="true">/</span> <span className="text-ivory/80">{property.title}</span>
          </nav>
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <PropertyGallery images={property.images} title={property.title} />
              {development && <p className="mt-4 text-xs text-ivory/65">Illustrative renders courtesy of {development.developer}.</p>}
            </div>
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.26em] text-champagne"><MapPin size={14} aria-hidden="true" />{property.location}</p>
                <h1 className="mt-4 text-4xl leading-tight text-ivory sm:text-5xl">{property.title}</h1>
                {development ? (
                  <>
                    <p className="signature mt-6 text-3xl text-champagne">{development.tagline}</p>
                    <p className="mt-4 text-sm leading-relaxed text-ivory/75">{development.developer} · {development.homes}</p>
                  </>
                ) : <p className="mt-6 font-serif text-3xl text-champagne">{formatAED(property.priceAED)}</p>}
                <div className="mt-6 flex flex-wrap gap-3 text-[0.62rem] uppercase tracking-[0.22em]">
                  <span className="border border-ivory/25 px-3 py-1.5 text-ivory/80">{property.category}</span>
                  {property.status && property.statusConfirmed && <span className="border border-champagne/60 px-3 py-1.5 text-champagne">{statusLabels[property.status]}</span>}
                </div>
                {development?.facts && (
                  <Reveal as="dl" variant="fade" className="mt-8 grid grid-cols-2 gap-x-4 gap-y-6 border-y border-ivory/10 py-6">
                    {development.facts.map(({ value, label }) => (
                      <div key={label}>
                        <dt className="text-[0.6rem] uppercase tracking-[0.22em] text-ivory/55">{label}</dt>
                        <dd className="mt-2 font-serif text-2xl text-ivory">{value}</dd>
                      </div>
                    ))}
                  </Reveal>
                )}
                {specs.length > 0 && (
                  <dl className="mt-8 grid grid-cols-3 border-y border-ivory/10 py-6">
                    {specs.map(({ icon: Icon, label, value }) => (
                      <div key={label}>
                        <dt className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/55"><Icon size={14} className="text-champagne" aria-hidden="true" />{label}</dt>
                        <dd className="mt-2 font-serif text-2xl text-ivory">{value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <div className="mt-8 flex flex-col gap-3">
                  <ButtonLink href={whatsappLink(enquiry)} icon={<WhatsAppIcon size={17} />}>Enquire on WhatsApp</ButtonLink>
                  <ButtonLink href={mailtoLink(`Enquiry: ${property.title}`, enquiry)} variant="outline" icon={<Mail size={16} strokeWidth={1.5} aria-hidden="true" />}>Enquire by email</ButtonLink>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 text-burgundy sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl">{development ? "About the development" : "About this property"}</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-burgundy/75">
              {property.description.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </div>
          </Reveal>
          {property.features.length > 0 && (
            <Reveal className="lg:col-span-4 lg:col-start-9" delay={90}>
              <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.26em]">Features &amp; amenities</h2>
              <ul className="mt-6 divide-y divide-burgundy/10 border-y border-burgundy/10">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 py-3.5 text-burgundy/80"><Check size={16} className="text-wine" aria-hidden="true" />{f}</li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
        {development?.sections?.map((section) => (
          <Reveal key={section.title} className="container-luxe mt-20 border-t border-burgundy/10 pt-16">
            <h2 className="text-4xl sm:text-5xl">{section.title}</h2>
            {section.intro && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-burgundy/75">{section.intro}</p>}
            {section.items && (
              <ul className={`mt-10 grid gap-10 ${section.items.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
                {section.items.map((item) => (
                  <li key={item.title} className="border-t border-wine/40 pt-6">
                    <h3 className="text-2xl">{item.title}</h3>
                    <p className="mt-3 leading-relaxed text-burgundy/75">{item.text}</p>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
        <div className="container-luxe mt-14">
          {development && (
            <details className="mb-8 max-w-3xl border-y border-burgundy/15 py-4">
              <summary className="cursor-pointer text-sm font-semibold text-wine">Project and destination sources</summary>
              <ul className="mt-4 space-y-2 pl-4 text-sm">
                {development.sources.map((source) => (
                  <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-wine">{source.label}<span className="sr-only"> (opens in a new tab)</span></a></li>
                ))}
              </ul>
            </details>
          )}
          <p className="max-w-3xl text-xs leading-relaxed text-burgundy/55">Information is provided by the seller or developer for guidance only and may change without notice. Please confirm price, availability and specifications directly before making any decision.</p>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-burgundy py-20 sm:py-28">
          <div className="container-luxe">
            <h2 className="mb-12 text-4xl text-ivory sm:text-5xl">{development ? "More featured developments" : "Similar properties"}</h2>
            <PropertyGrid items={similar} />
          </div>
        </section>
      )}
    </>
  );
}
