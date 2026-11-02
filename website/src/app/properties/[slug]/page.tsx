import { Bath, BedDouble, Check, Mail, MapPin, Maximize2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ButtonLink from "@/components/ButtonLink";
import PropertyGallery from "@/components/PropertyGallery";
import PropertyGrid from "@/components/PropertyGrid";
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
    description: `${property.title}, ${property.location}. ${formatAED(property.priceAED)}. ${property.shortDescription}`,
    path: `/properties/${property.slug}/`,
    image: property.images[0]?.src,
  });
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const similar = getSimilarProperties(property);
  const enquiry = `Hello Gescard, I'm interested in "${property.title}" (${property.location}) on your website: ${absoluteUrl(`/properties/${property.slug}/`)}`;
  const specs = [
    { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
    { icon: Bath, label: "Bathrooms", value: property.bathrooms },
    { icon: Maximize2, label: "Size", value: property.sizeSqft !== undefined ? `${property.sizeSqft.toLocaleString("en-US")} sq ft` : undefined },
  ].filter((s) => s.value !== undefined);

  return (
    <>
      <section className="bg-charcoal pb-20 pt-32 sm:pt-40">
        <div className="container-luxe">
          <nav aria-label="Breadcrumb" className="text-[0.68rem] uppercase tracking-[0.24em] text-ivory/55">
            <Link href="/properties/" className="hover:text-gold">Properties</Link> <span aria-hidden="true">/</span> <span className="text-ivory/80">{property.title}</span>
          </nav>
          <div className="mt-8 grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <PropertyGallery images={property.images} title={property.title} />
            </div>
            <aside className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.26em] text-gold"><MapPin size={14} aria-hidden="true" />{property.location}</p>
                <h1 className="mt-4 text-4xl leading-tight text-ivory sm:text-5xl">{property.title}</h1>
                <p className="mt-6 font-serif text-3xl text-gold">{formatAED(property.priceAED)}</p>
                <div className="mt-6 flex flex-wrap gap-3 text-[0.62rem] uppercase tracking-[0.22em]">
                  <span className="border border-ivory/25 px-3 py-1.5 text-ivory/80">{property.category}</span>
                  {property.status && property.statusConfirmed && <span className="border border-gold/60 px-3 py-1.5 text-gold">{statusLabels[property.status]}</span>}
                </div>
                {specs.length > 0 && (
                  <dl className="mt-8 grid grid-cols-3 border-y border-ivory/10 py-6">
                    {specs.map(({ icon: Icon, label, value }) => (
                      <div key={label}>
                        <dt className="flex items-center gap-2 text-[0.6rem] uppercase tracking-[0.22em] text-ivory/55"><Icon size={14} className="text-gold" aria-hidden="true" />{label}</dt>
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

      <section className="bg-ivory py-20 text-charcoal sm:py-28">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <h2 className="text-4xl sm:text-5xl">About this property</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-charcoal/75">
              {property.description.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
            </div>
          </div>
          {property.features.length > 0 && (
            <div className="lg:col-span-4 lg:col-start-9">
              <h2 className="font-sans text-[0.75rem] font-semibold uppercase tracking-[0.26em]">Features &amp; amenities</h2>
              <ul className="mt-6 divide-y divide-charcoal/10 border-y border-charcoal/10">
                {property.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 py-3.5 text-charcoal/80"><Check size={16} className="text-gold-deep" aria-hidden="true" />{f}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="container-luxe mt-14">
          <p className="max-w-3xl text-xs leading-relaxed text-charcoal/55">Information is provided by the seller or developer for guidance only and may change without notice. Please confirm price, availability and specifications directly before making any decision.</p>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-charcoal py-20 sm:py-28">
          <div className="container-luxe">
            <h2 className="mb-12 text-4xl text-ivory sm:text-5xl">Similar properties</h2>
            <PropertyGrid items={similar} />
          </div>
        </section>
      )}
    </>
  );
}
