import { instagramPosts } from "@/data/instagram";
import { profile } from "@/data/profile";
import ButtonLink from "./ButtonLink";
import Reveal from "./Reveal";
import ResponsiveImage from "./ResponsiveImage";
import { InstagramIcon } from "./icons";

export default function InstagramSection() {
  const ig = profile.socials.instagram;
  return (
    <section className="bg-ivory py-24 text-charcoal sm:py-32" aria-labelledby="instagram-heading">
      <div className="container-luxe">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="eyebrow text-gold-deep">Instagram</p>
            <h2 id="instagram-heading" className="mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[3.6rem]">Follow the Journey.</h2>
            <a href={ig.url} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex items-center gap-3 text-charcoal/75 transition-colors duration-500 hover:text-gold-deep">
              <span className="transition-transform duration-500 group-hover:-translate-y-0.5"><InstagramIcon size={20} /></span> <span className="link-line text-[0.95rem]">{ig.handle}</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </Reveal>
          <Reveal delay={120}>
            <ButtonLink href={ig.url} variant="outline-dark" icon={<InstagramIcon size={16} />}>Follow on Instagram</ButtonLink>
          </Reveal>
        </div>
        <ul className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {instagramPosts.map((post, i) => (
            <Reveal as="li" variant="image" key={post.image} delay={i * 110}>
              <a href={post.url ?? ig.url} target="_blank" rel="noopener noreferrer" className="img-zoom group relative block aspect-square overflow-hidden bg-ivory-deep" aria-label={`${post.alt}. View on Instagram (opens in a new tab)`}>
                <ResponsiveImage image={post.image} alt={post.alt} sizes="(min-width: 1024px) 25vw, 50vw" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-charcoal/0 text-ivory opacity-0 transition-all duration-500 group-hover:bg-charcoal/45 group-hover:opacity-100" aria-hidden="true">
                  <InstagramIcon size={28} />
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
