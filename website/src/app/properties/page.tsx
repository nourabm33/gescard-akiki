import FinalCta from "@/components/FinalCta";
import PageHero from "@/components/PageHero";
import PropertiesEmptyState from "@/components/PropertiesEmptyState";
import PropertyGrid from "@/components/PropertyGrid";
import { properties } from "@/data/properties";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Properties",
  description: "Discover selected apartments, villas and property opportunities in the UAE with Gescard Akiki.",
  path: "/properties/",
});

export default function PropertiesPage() {
  return (
    <>
      <PageHero eyebrow="Properties" title="Discover Selected Properties in the UAE." intro="Explore a curated selection of apartments, villas and property opportunities." image="stock/palm-jumeirah" />
      <section className="bg-burgundy py-24 sm:py-32">
        <div className="container-luxe">{properties.length ? <PropertyGrid items={properties} /> : <PropertiesEmptyState />}</div>
      </section>
      <FinalCta title="Looking for Something Specific?" text="Share your preferred location, property type and budget, and Gescard will help you explore suitable options." />
    </>
  );
}
