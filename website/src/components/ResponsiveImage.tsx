import { responsiveImage, type ImageKey } from "@/lib/images";

type Props = {
  image: ImageKey;
  alt: string;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

/** Pre-optimised WebP with srcset, intrinsic size (no layout shift) and lazy loading below the fold. */
export default function ResponsiveImage({ image, alt, sizes = "100vw", className = "", priority = false }: Props) {
  const img = responsiveImage(image);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      width={img.width}
      height={img.height}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding={priority ? "sync" : "async"}
      fetchPriority={priority ? "high" : undefined}
    />
  );
}
