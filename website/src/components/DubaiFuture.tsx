import ButtonLink from "./ButtonLink";
import ResponsiveImage from "./ResponsiveImage";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const developments = [
  {
    name: "Al Maktoum International Airport",
    stage: "Expansion underway",
    detail: "Dubai is expanding its airport at Dubai World Central in phases. The new passenger terminal puts long-term air links and logistics capacity at the centre of Dubai South’s growth plans.",
    source: "https://www.mediaoffice.ae/en/news/2026/june/15-06/hamdan-bin-mohammed-approves-al-maktoum-airport",
  },
  {
    name: "Expo City Dubai",
    stage: "Open · Masterplan developing",
    detail: "The former Expo site is open, with a wider masterplan for homes, workplaces, event venues and public space. For buyers, the mix of uses is a reason to look closely at what is already within walking distance.",
    source: "https://www.expocitydubai.com/en/the-expo-city-dubai-master-plan/",
  },
  {
    name: "Jebel Ali Port",
    stage: "Operational",
    detail: "DP World’s port and the adjacent Jebel Ali Free Zone form an established employment and logistics hub. They give context to the road links and job centres around Dubai’s southern waterfront.",
    source: "https://www.dpworld.com/en/ports-terminals/uae/jebel-ali-port",
  },
];

export default function DubaiFuture() {
  return (
    <section id="dubai-future" className="scroll-mt-24 bg-ivory py-24 text-burgundy sm:py-32" aria-labelledby="future-heading">
      <div className="container-luxe">
        <SectionHeading tone="light" eyebrow="Infrastructure & Connectivity" title={<span id="future-heading">The Future of Dubai</span>} intro="When I compare locations, I look at what is already in place and what is still being built. Both matter when you’re choosing where to live or invest." />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal as="figure" variant="image">
            <ResponsiveImage image="stock/downtown-dubai" alt="The Dubai skyline with Burj Khalifa" sizes="(min-width: 1024px) 45vw, 100vw" className="aspect-[4/3] w-full object-cover lg:aspect-[4/5]" />
            <figcaption className="mt-3 text-xs text-burgundy/65">Dubai skyline</figcaption>
          </Reveal>
          <ol className="divide-y divide-burgundy/15 border-y border-burgundy/15">
            {developments.map((item, index) => (
              <Reveal as="li" key={item.name} delay={index * 100} className="py-7">
                <p className="text-[0.67rem] font-semibold uppercase tracking-[0.22em] text-wine">{item.stage}</p>
                <h3 className="mt-2 text-2xl leading-snug">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-burgundy/75 sm:text-base">{item.detail}</p>
                <ButtonLink href={item.source} variant="text-dark" className="mt-2" ariaLabel={`Read official updates about ${item.name} (opens in a new tab)`}>Official source</ButtonLink>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
