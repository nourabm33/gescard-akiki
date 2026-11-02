import type { Property } from "@/data/properties";
import PropertyCard from "./PropertyCard";
import Reveal from "./Reveal";

export default function PropertyGrid({ items }: { items: Property[] }) {
  return (
    <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((p, i) => (
        <Reveal key={p.slug} delay={(i % 3) * 120} className="h-full">
          <PropertyCard property={p} />
        </Reveal>
      ))}
    </div>
  );
}
