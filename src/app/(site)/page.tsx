import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { ServiceTimes } from "@/components/home/service-times";
import { Welcome } from "@/components/home/welcome";
import { VerseBand } from "@/components/ui/verse-band";
import { UpcomingEvents } from "@/components/home/upcoming-events";
import { LatestSermons } from "@/components/home/latest-sermons";
import { MinistriesPreview } from "@/components/home/ministries-preview";
import { TestimoniesPreview } from "@/components/home/testimonies-preview";
import { LeadershipPreview } from "@/components/home/leadership-preview";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { FindUs } from "@/components/home/find-us";
import { FinalCta } from "@/components/home/final-cta";
import {
  getServices,
  getUpcomingEvents,
  getLatestSermons,
  getFeaturedMinistries,
  getFeaturedTestimonies,
  getFeaturedLeaders,
  getFeaturedGalleryImages,
} from "@/lib/data/content";
import { homeContent } from "@/lib/content/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: site.fullName },
  description: homeContent.hero.welcome,
};

export default async function HomePage() {
  const [services, upcoming, latest, featuredMinistries, featuredTestimonies, featuredLeaders, featuredGallery] =
    await Promise.all([
      getServices(),
      getUpcomingEvents(3),
      getLatestSermons(3),
      getFeaturedMinistries(6),
      getFeaturedTestimonies(3),
      getFeaturedLeaders(4),
      getFeaturedGalleryImages(6),
    ]);

  return (
    <>
      <Hero />
      <ServiceTimes services={services} />
      <Welcome />
      <VerseBand
        verse={homeContent.hero.verse.text}
        reference={homeContent.hero.verse.reference}
      />
      <UpcomingEvents events={upcoming} />
      <LatestSermons sermons={latest} />
      <MinistriesPreview ministries={featuredMinistries} />
      <TestimoniesPreview testimonials={featuredTestimonies} />
      <LeadershipPreview leaders={featuredLeaders} />
      <GalleryPreview images={featuredGallery} />
      <FindUs />
      <FinalCta />
    </>
  );
}