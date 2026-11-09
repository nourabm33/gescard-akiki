import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import PropertiesEmptyState from "@/components/PropertiesEmptyState";
import PropertyGrid from "@/components/PropertyGrid";
import { properties } from "@/data/properties";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Featured Developments",
  description: "Explore Marsa Al Saadiyat in Abu Dhabi and Palm Central on Palm Jebel Ali with off-plan property consultant Gescard Akiki.",
  path: "/properties/",
});

export default function PropertiesPage() {
  return (
    <>
      <PageHero eyebrow="Featured Developments" title="Two coastlines. Two distinct addresses." intro="Explore selected off-plan communities in Dubai and Abu Dhabi through the places, architecture and plans that shape them." image="stock/dubai-skyline" />
      <section className="bg-burgundy py-24 sm:py-32">
        <div className="container-luxe">{properties.length ? <PropertyGrid items={properties} /> : <PropertiesEmptyState />}</div>
      </section>
      <FinalCta title="Looking for Something Specific?" text="Share your preferred location, property type and budget, and Gescard will help you explore suitable options." />
    </>
  );
}
