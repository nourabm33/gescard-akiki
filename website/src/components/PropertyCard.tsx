import Link from "next/link";
import { Bath, BedDouble, Maximize2 } from "lucide-react";
import { formatAED, statusLabels, type Property } from "@/data/properties";
import { asset } from "@/lib/site";

export default function PropertyCard({ property }: { property: Property }) {
  const cover = property.images[0];
  const development = property.development;
  const detailLabel = development ? "Explore the development" : "View property";
  const showStatus = property.status && property.statusConfirmed;
  return (
    <article className="group relative flex h-full flex-col">
      <Link href={`/properties/${property.slug}/`} className={`property-cover img-zoom relative block overflow-hidden bg-burgundy-soft ${development ? "aspect-[16/10]" : "aspect-[4/5]"}`}>
        {cover && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={asset(cover.previewSrc ?? cover.src)} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover" />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-burgundy/80 via-transparent to-transparent transition-opacity duration-700" aria-hidden="true" />
        <span className="absolute inset-0 bg-burgundy/0 transition-colors duration-700 group-hover:bg-burgundy/25" aria-hidden="true" />
        <span className="property-cover-label absolute bottom-5 right-5 border border-ivory/40 bg-burgundy/75 px-3 py-1.5 text-[0.6rem] font-medium uppercase tracking-[0.24em] text-ivory">View details<span className="sr-only"> for {property.title}</span></span>
        <span className="absolute left-5 top-5 bg-burgundy/90 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ivory" aria-hidden="true">
          {property.category}
        </span>
        {showStatus && (
          <span className="absolute right-5 top-5 border border-champagne/60 bg-burgundy/70 px-3 py-1.5 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-champagne">
            {statusLabels[property.status!]}
          </span>
        )}
        {!development && <span className="absolute bottom-5 left-5 font-serif text-2xl text-ivory">{formatAED(property.priceAED)}</span>}
      </Link>
      <div className="flex flex-1 flex-col border-b border-ivory/10 pb-7 pt-6">
        <p className="text-[0.68rem] uppercase tracking-[0.26em] text-champagne">{property.location}{development && ` · ${development.developer}`}</p>
        <h3 className="mt-3 text-[1.75rem] leading-tight text-ivory">
          <Link href={`/properties/${property.slug}/`} className="transition-colors hover:text-champagne">{property.title}</Link>
        </h3>
        {development && <p className="signature mt-3 text-2xl text-ivory/85">{development.tagline}</p>}
        <p className="mt-3 text-sm leading-relaxed text-ivory/65">{property.shortDescription}</p>
        <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem] text-ivory/75">
          {property.bedrooms !== undefined && (
            <li className="flex items-center gap-2"><BedDouble size={15} strokeWidth={1.4} className="text-champagne" aria-hidden="true" />{property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}</li>
          )}
          {property.bathrooms !== undefined && (
            <li className="flex items-center gap-2"><Bath size={15} strokeWidth={1.4} className="text-champagne" aria-hidden="true" />{property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}</li>
          )}
          {property.sizeSqft !== undefined && (
            <li className="flex items-center gap-2"><Maximize2 size={14} strokeWidth={1.4} className="text-champagne" aria-hidden="true" />{property.sizeSqft.toLocaleString("en-US")} sq ft</li>
          )}
        </ul>
        <Link href={`/properties/${property.slug}/`} className="mt-auto inline-flex items-center gap-3 pt-6 text-[0.7rem] font-medium uppercase tracking-[0.24em] text-champagne transition-colors hover:text-ivory">
          {detailLabel}<span className="sr-only">: {property.title}</span> <span aria-hidden="true" className="h-px w-9 origin-left scale-x-75 bg-current transition-transform duration-500 group-hover:scale-x-100 group-focus-within:scale-x-100" />
        </Link>
      </div>
    </article>
  );
}
