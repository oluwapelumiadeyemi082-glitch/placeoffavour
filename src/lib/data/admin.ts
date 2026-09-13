/**
 * Admin data access (Phase 5).
 * ----------------------------------
 * The dashboard needs the FULL dataset, not just what the public site shows:
 * unapproved testimonies, every contact message, every row regardless of order
 * or approval. When the database is connected these helpers run against Postgres;
 * otherwise they return the static placeholder content so the pages stay
 * navigable, and the pages themselves show a "database not connected" notice.
 */

import { getDb } from "@/lib/db";
import {
  ChurchService,
  Sermon,
  ChurchEvent,
  Ministry,
  Leader,
  Testimonial,
  GalleryAlbum,
  GalleryImage,
  AboutContent,
} from "@/types/content";

import {
  ChurchService as ChurchServiceRow,
  Sermon as SermonRow,
  ChurchEvent as ChurchEventRow,
  Ministry as MinistryRow,
  Leader as LeaderRow,
  Testimonial as TestimonialRow,
  GalleryAlbum as GalleryAlbumRow,
} from "@prisma/client";

import { services } from "@/lib/content/services";
import { sermons } from "@/lib/content/sermons";
import { events } from "@/lib/content/events";
import { ministries } from "@/lib/content/ministries";
import { leaders } from "@/lib/content/leaders";
import { testimonies } from "@/lib/content/testimonies";
import { galleryAlbums, galleryImages } from "@/lib/content/gallery";
import { aboutContent } from "@/lib/content/about";

function toIsoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function mapService(row: ChurchServiceRow): ChurchService {
  return {
    id: row.id, title: row.title, description: row.description,
    day: row.day, time: row.time, location: row.location,
    image: row.image, order: row.order,
  };
}

export function mapSermon(row: SermonRow): Sermon {
  return {
    id: row.id, slug: row.slug, title: row.title, preacher: row.preacher,
    date: toIsoDate(row.date), description: row.description,
    scripture: row.scripture, image: row.image,
    audioUrl: row.audioUrl, videoUrl: row.videoUrl,
  };
}

export function mapEvent(row: ChurchEventRow): ChurchEvent {
  return {
    id: row.id, slug: row.slug, title: row.title, date: toIsoDate(row.date),
    time: row.time, location: row.location, description: row.description,
    image: row.image, endDate: row.endDate ? toIsoDate(row.endDate) : null,
  };
}

export function mapMinistry(row: MinistryRow): Ministry {
  return {
    id: row.id, name: row.name, tagline: row.tagline, description: row.description,
    leader: row.leader, image: row.image, contact: row.contact,
  };
}

export function mapLeader(row: LeaderRow): Leader {
  return {
    id: row.id, name: row.name, position: row.position, bio: row.bio,
    image: row.image, socials: (row.socials as Record<string, string> | undefined),
  };
}

export function mapTestimonial(row: TestimonialRow): Testimonial {
  return {
    id: row.id, name: row.name, message: row.message, isApproved: row.isApproved,
  };
}

export function mapGalleryAlbum(row: GalleryAlbumRow): GalleryAlbum {
  return {
    id: row.id, slug: row.slug, name: row.name,
    description: row.description, cover: row.cover,
  };
}

export async function getAdminServices(): Promise<ChurchService[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.churchService.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
      if (rows.length > 0) return rows.map(mapService);
    } catch (error) { console.error("[admin] getAdminServices failed:", error); }
  }
  return services;
}

export async function getAdminSermons(): Promise<Sermon[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.sermon.findMany({ orderBy: [{ date: "desc" }, { id: "asc" }] });
      if (rows.length > 0) return rows.map(mapSermon);
    } catch (error) { console.error("[admin] getAdminSermons failed:", error); }
  }
  return sermons;
}

export async function getAdminEvents(): Promise<ChurchEvent[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.churchEvent.findMany({ orderBy: [{ date: "asc" }, { id: "asc" }] });
      if (rows.length > 0) return rows.map(mapEvent);
    } catch (error) { console.error("[admin] getAdminEvents failed:", error); }
  }
  return events;
}

export async function getAdminMinistries(): Promise<Ministry[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.ministry.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
      if (rows.length > 0) return rows.map(mapMinistry);
    } catch (error) { console.error("[admin] getAdminMinistries failed:", error); }
  }
  return ministries;
}

export async function getAdminLeaders(): Promise<Leader[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.leader.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
      if (rows.length > 0) return rows.map(mapLeader);
    } catch (error) { console.error("[admin] getAdminLeaders failed:", error); }
  }
  return leaders;
}

export async function getAdminTestimonials(): Promise<Testimonial[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.testimonial.findMany({ orderBy: { createdAt: "desc" } });
      if (rows.length > 0) return rows.map(mapTestimonial);
    } catch (error) { console.error("[admin] getAdminTestimonials failed:", error); }
  }
  return [...testimonies].sort((a, b) => Number(a.isApproved) - Number(b.isApproved));
}

export async function getAdminMessages(): Promise<{
  id: string; name: string; email: string; phone: string | null;
  subject: string; message: string; createdAt: Date | null;
}[]> {
  const client = getDb();
  if (!client) return [];
  try {
    return await client.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  } catch (error) {
    console.error("[admin] getAdminMessages failed:", error);
    return [];
  }
}

export async function getAdminGalleryAlbums(): Promise<GalleryAlbum[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.galleryAlbum.findMany({ orderBy: [{ order: "asc" }, { id: "asc" }] });
      if (rows.length > 0) return rows.map(mapGalleryAlbum);
    } catch (error) { console.error("[admin] getAdminGalleryAlbums failed:", error); }
  }
  return galleryAlbums;
}

export async function getAdminGalleryImages(): Promise<GalleryImage[]> {
  const client = getDb();
  if (client) {
    try {
      const rows = await client.galleryImage.findMany({ include: { album: true } });
      return rows.map((row) => ({
        id: row.id, albumSlug: row.album.slug, src: row.src,
        alt: row.alt, caption: row.caption ?? undefined,
      }));
    } catch (error) { console.error("[admin] getAdminGalleryImages failed:", error); }
  }
  return galleryImages;
}

export async function getAdminAbout(): Promise<AboutContent> {
  const client = getDb();
  if (client) {
    try {
      const row = await client.aboutContent.findUnique({ where: { id: "default" } });
      const values = await client.coreValue.findMany({ orderBy: { order: "asc" } });
      const milestones = await client.milestone.findMany({ orderBy: { order: "asc" } });
      if (row) {
        return {
          history: row.history,
          vision: row.vision,
          mission: row.mission,
          leadersIntro: row.leadersIntro,
          welcome: row.welcome,
          values: values.map((v) => ({ id: v.id, title: v.title, description: v.description })),
          milestones: milestones.map((m) => ({ year: m.year, title: m.title, description: m.description })),
        };
      }
    } catch (error) { console.error("[admin] getAdminAbout failed:", error); }
  }
  return aboutContent;
}