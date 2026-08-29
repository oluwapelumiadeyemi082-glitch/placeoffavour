import type { GalleryAlbum, GalleryImage } from "@/types/content";

/**
 * PLACEHOLDER CONTENT (Phase 1) — see src/lib/content/services.ts for notes.
 * Images are placeholder SVGs. A file/object storage layer (e.g. Cloudinary,
 * S3, Vercel Blob) will be introduced alongside the database in later phases.
 */

export const galleryAlbums: GalleryAlbum[] = [
  {
    id: "alb-services",
    slug: "services-and-worship",
    name: "Services & Worship",
    description: "Moments of praise and worship from our services.",
    cover: "/images/worship-2.svg",
  },
  {
    id: "alb-conferences",
    slug: "conferences",
    name: "Conferences",
    description: "Highlights from our conventions and conferences.",
    cover: "/images/gathering-1.svg",
  },
  {
    id: "alb-outreach",
    slug: "outreach",
    name: "Outreach & Missions",
    description: "Sharing God's love beyond the walls of the church.",
    cover: "/images/worship-1.svg",
  },
];

export const galleryImages: GalleryImage[] = [
  {
    id: "img-1",
    albumSlug: "services-and-worship",
    src: "/images/worship-2.svg",
    alt: "Congregation in praise during Sunday service",
    caption: "Sunday celebration",
  },
  {
    id: "img-2",
    albumSlug: "services-and-worship",
    src: "/images/worship-1.svg",
    alt: "Preacher sharing the word during service",
    caption: "The word of God",
  },
  {
    id: "img-3",
    albumSlug: "services-and-worship",
    src: "/images/hero-silhouette.svg",
    alt: "Church auditorium during evening programme",
    caption: "Evening programme",
  },
  {
    id: "img-4",
    albumSlug: "conferences",
    src: "/images/gathering-1.svg",
    alt: "Attendees during the annual convention",
    caption: "Annual convention",
  },
  {
    id: "img-5",
    albumSlug: "conferences",
    src: "/images/worship-2.svg",
    alt: "Worship team leading songs at conference",
    caption: "Worship at the convention",
  },
  {
    id: "img-6",
    albumSlug: "outreach",
    src: "/images/gathering-1.svg",
    alt: "Volunteers during community outreach",
    caption: "Community outreach",
  },
  {
    id: "img-7",
    albumSlug: "outreach",
    src: "/images/worship-1.svg",
    alt: "Sharing gifts with community members",
    caption: "Sharing God's love",
  },
];