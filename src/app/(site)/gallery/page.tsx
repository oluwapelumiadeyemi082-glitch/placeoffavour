import type { Metadata } from "next";
import { getGalleryAlbums, getGalleryImages } from "@/lib/data/content";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { SectionHeader } from "@/components/ui/section-header";
import { GalleryBrowser } from "@/components/gallery-browser";
import { FinalCta } from "@/components/home/final-cta";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos from services, conferences, anniversaries, outreach programs and special moments at Place of Favour.",
};

export default async function GalleryPage() {
  const [galleryAlbums, galleryImages] = await Promise.all([
    getGalleryAlbums(),
    getGalleryImages(),
  ]);

  return (
    <>
      <PageHero
        eyebrow="Moments"
        title="Gallery"
        description="A glimpse into worship, fellowship and service in our church family."
        crumb="Gallery"
      />

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            eyebrow="Albums"
            title="Browse by category"
            description="Filter the gallery by album to see moments from services, conferences and outreach."
          />
          <div className="mt-10">
            <GalleryBrowser albums={galleryAlbums} images={galleryImages} />
          </div>
        </Container>
      </section>

      <FinalCta />
    </>
  );
}