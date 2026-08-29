/**
 * Shared content types used across the public site and the admin dashboard.
 *
 * These model the Prisma schema that is introduced in Phase 3. During Phase 1
 * they are fed with clearly-marked placeholder content from `src/lib/content`,
 * so pages can be built before the database layer exists.
 */

export type Role = "SUPER_ADMIN" | "ADMIN" | "EDITOR";

export interface ChurchService {
  id: string;
  title: string;
  description: string;
  day: string;
  time: string;
  location: string;
  image: string;
  order: number;
}

export interface Sermon {
  id: string;
  slug: string;
  title: string;
  preacher: string;
  date: string;
  description: string;
  scripture: string;
  image: string;
  audioUrl?: string | null;
  videoUrl?: string | null;
}

export interface ChurchEvent {
  id: string;
  slug: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  endDate?: string | null;
}

export interface Ministry {
  id: string;
  name: string;
  tagline: string;
  description: string;
  leader?: string | null;
  image: string;
  contact?: string | null;
}

export interface Leader {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  socials?: Record<string, string>;
}

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  /** Only approved testimonies are shown publicly. */
  isApproved: boolean;
}

export interface GalleryAlbum {
  id: string;
  slug: string;
  name: string;
  description: string;
  cover: string;
}

export interface GalleryImage {
  id: string;
  albumSlug: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface CoreValue {
  id: string;
  title: string;
  description: string;
}

export interface AboutContent {
  history: string[];
  vision: string;
  mission: string;
  values: CoreValue[];
  leadersIntro: string;
  welcome: string;
  milestones: { year: string; title: string; description: string }[];
}