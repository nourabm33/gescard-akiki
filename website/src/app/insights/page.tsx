import ButtonLink from "@/components/ButtonLink";
import FinalCta from "@/components/FinalCta";
import InstagramSection from "@/components/InstagramSection";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import VideoCard from "@/components/VideoCard";
import { YouTubeIcon } from "@/components/icons";
import { profile } from "@/data/profile";
import { longVideos, shortVideos } from "@/data/videos";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Dubai property tours, real estate content and insights from Gescard Akiki on YouTube and Instagram.",
  path: "/insights/",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights & Media" title="Discover Dubai Through My Perspective." intro="Explore property tours, Dubai real estate content and insights through Gescard's videos." image="stock/dubai-night-boulevard">
        <ButtonLink href={profile.socials.youtube.subscribeUrl} icon={<YouTubeIcon size={17} />}>Subscribe on YouTube</ButtonLink>
      </PageHero>

      {longVideos.length > 0 && (
        <section className="bg-charcoal py-24 sm:py-28" aria-labelledby="videos-heading">
          <div className="container-luxe">
            <Reveal>
              <p className="eyebrow text-gold">Videos</p>
              <h2 id="videos-heading" className="mt-5 text-[2.4rem] leading-[1.05] text-ivory sm:text-5xl">Property tours &amp; projects.</h2>
            </Reveal>
            <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-8">
              {longVideos.map((v, i) => (
                <Reveal key={v.id} delay={i * 120}><VideoCard video={v} large /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {shortVideos.length > 0 && (
        <section className="border-t border-ivory/5 bg-charcoal-soft py-24 sm:py-28" aria-labelledby="shorts-heading">
          <div className="container-luxe">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <p className="eyebrow text-gold">Shorts</p>
                <h2 id="shorts-heading" className="mt-5 text-[2.4rem] leading-[1.05] text-ivory sm:text-5xl">Quick takes on the market.</h2>
              </Reveal>
              <Reveal delay={100}><ButtonLink href={profile.socials.youtube.url} variant="text">View channel</ButtonLink></Reveal>
            </div>
            <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
              {shortVideos.map((v, i) => (
                <Reveal key={v.id} delay={(i % 4) * 90}><VideoCard video={v} /></Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <InstagramSection />
      <FinalCta />
    </>
  );
}
