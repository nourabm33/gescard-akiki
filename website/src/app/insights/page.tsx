import ButtonLink from "@/components/ButtonLink";
import FinalCta from "@/components/FinalCta";
import InstagramSection from "@/components/InstagramSection";
import PageHero from "@/components/PageHero";
import YouTubeSection from "@/components/YouTubeSection";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Media",
  description: "Watch Gescard Akiki’s Instagram Reels and longer YouTube tours of UAE off-plan developments.",
  path: "/insights/",
});

export default function InsightsPage() {
  return (
    <>
      <PageHero eyebrow="Insights & Media" title="See the location for yourself." intro="Join Gescard on site for short Instagram Reels and longer YouTube walkthroughs." image="stock/dubai-night-boulevard" videoClip="award-stage">
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="#instagram-heading">Instagram Reels</ButtonLink>
          <ButtonLink href="#youtube-heading" variant="outline">YouTube videos</ButtonLink>
        </div>
      </PageHero>
      <InstagramSection limit={6} />
      <YouTubeSection limit={6} />
      <FinalCta />
    </>
  );
}
