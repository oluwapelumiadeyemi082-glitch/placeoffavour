import Link from "next/link";
import type { GalleryImage } from "@/types/content";
import { homeContent } from "@/lib/content/home";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { CoverImage } from "@/components/ui/cover-image";
import { Icon } from "@/components/ui/icon";

const aspectClasses = [
  "aspect-[4/3]",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[4/3]",
  "aspect-square",
  "aspect-[4/3]",
];

export function GalleryPreview({ images }: { images: GalleryImage[] }) {
  return (
    <section className="bg-cream-50 py-20 sm:py-24">
      <Container>
        <SectionHeader
          eyebrow={homeContent.galleryEyebrow}
          title={homeContent.galleryTitle}
          description="Worship, fellowship and service — captured in moments that tell our story."
        />
        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((image, i) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-2xl shadow-soft transition-shadow hover:shadow-lift"
            >
              <CoverImage
                src={image.src}
                alt={image.alt}
                className={aspectClasses[i % aspectClasses.length]}
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-sm font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {image.caption}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={homeContent.galleryCta.href}
            className="inline-flex items-center gap-2 font-semibold text-gold-700 underline-offset-4 hover:underline"
          >
            {homeContent.galleryCta.label}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  );
}