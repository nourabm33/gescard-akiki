import { profile } from "@/data/profile";
import { longVideos } from "@/data/videos";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import VideoCard from "./VideoCard";
import { YouTubeIcon } from "./icons";

export default function YouTubeSection() {
  return (
    <section className="bg-burgundy-soft py-24 sm:py-32" aria-labelledby="youtube-heading">
      <div className="container-luxe">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="YouTube" title={<span id="youtube-heading">In-Depth Perspectives</span>} intro="Longer walkthroughs of the masterplans and places Gescard follows." />
          <Reveal>
            <ButtonLink href={profile.socials.youtube.url} variant="outline" icon={<YouTubeIcon size={17} />}>View channel</ButtonLink>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {longVideos.map((video, index) => (
            <Reveal key={video.id} delay={(index % 3) * 120}>
              <VideoCard video={video} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
