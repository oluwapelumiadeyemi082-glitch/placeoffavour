"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { PrismaClient } from "@prisma/client";
import { getDb } from "@/lib/db";
import { getSignedInUser } from "@/lib/auth-actions";

export interface AdminActionResult {
  ok: boolean;
  error?: string;
}

const NO_DB_MSG =
  "The database is not connected yet, so nothing was saved. Add DATABASE_URL to the environment before editing content.";

const NO_AUTH_MSG = "You need to be signed in as an administrator to do that.";

async function guard(): Promise<{ client: PrismaClient } | { error: string }> {
  const user = await getSignedInUser();
  if (!user || user.role === "EDITOR") return { error: NO_AUTH_MSG };
  const client = getDb();
  if (!client) return { error: NO_DB_MSG };
  return { client };
}

function nonEmpty(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

function optional(value: FormDataEntryValue | null): string | null {
  const str = nonEmpty(value);
  return str ? str : null;
}

function asInt(value: FormDataEntryValue | null, fallback = 0): number {
  const parsed = Number.parseInt(nonEmpty(value), 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toUtcDate(date: string): Date {
  return new Date(`${date}T00:00:00.000Z`);
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nextId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}

function revalidateAdmin(path?: string): void {
  revalidatePath("/admin");
  if (path) revalidatePath(path);
  revalidatePath("/");
  revalidatePath("/sermons/[slug]", "page");
  revalidatePath("/events/[slug]", "page");
}

/* Services ---------------------------------------------------------- */

export async function saveService(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const id = nonEmpty(formData.get("id")) || nextId("svc");
  const title = nonEmpty(formData.get("title"));
  const description = nonEmpty(formData.get("description"));
  if (!title || !description) return { ok: false, error: "Please provide a service title and description." };

  const data = {
    title,
    description,
    day: nonEmpty(formData.get("day")) || "Sunday",
    time: nonEmpty(formData.get("time")),
    location: nonEmpty(formData.get("location")),
    image: nonEmpty(formData.get("image")),
    order: asInt(formData.get("order"), 0),
  };

  try {
    await gate.client.churchService.upsert({ where: { id }, update: data, create: { id, ...data } });
    revalidateAdmin("/services");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveService failed:", error);
    return { ok: false, error: "Could not save the service. Please try again." };
  }
}

export async function deleteService(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.churchService.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteService failed:", error);
  }
  revalidateAdmin("/services");
}

/* Sermons ------------------------------------------------------------ */

export async function saveSermon(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const id = nonEmpty(formData.get("id")) || nextId("ser");
  const title = nonEmpty(formData.get("title"));
  if (!title) return { ok: false, error: "Please provide a sermon title." };

  const date = nonEmpty(formData.get("date")) || new Date().toISOString().slice(0, 10);
  const data = {
    slug: slugify(title),
    title,
    preacher: nonEmpty(formData.get("preacher")),
    date: toUtcDate(date),
    description: nonEmpty(formData.get("description")),
    scripture: nonEmpty(formData.get("scripture")),
    image: nonEmpty(formData.get("image")),
    audioUrl: optional(formData.get("audioUrl")),
    videoUrl: optional(formData.get("videoUrl")),
  };

  try {
    await gate.client.sermon.upsert({ where: { id }, update: data, create: { id, ...data } });
    revalidateAdmin("/sermons");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveSermon failed:", error);
    return { ok: false, error: "Could not save the sermon. Please try again." };
  }
}

export async function deleteSermon(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.sermon.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteSermon failed:", error);
  }
  revalidateAdmin("/sermons");
}

/* Events -------------------------------------------------------------- */

export async function saveEvent(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const id = nonEmpty(formData.get("id")) || nextId("evt");
  const title = nonEmpty(formData.get("title"));
  if (!title) return { ok: false, error: "Please provide an event title." };

  const date = nonEmpty(formData.get("date")) || new Date().toISOString().slice(0, 10);
  const data = {
    slug: slugify(title),
    title,
    date: toUtcDate(date),
    time: nonEmpty(formData.get("time")),
    location: nonEmpty(formData.get("location")),
    description: nonEmpty(formData.get("description")),
    image: nonEmpty(formData.get("image")),
    endDate: optional(formData.get("endDate")) ? toUtcDate(optional(formData.get("endDate"))!) : null,
  };

  try {
    await gate.client.churchEvent.upsert({ where: { id }, update: data, create: { id, ...data } });
    revalidateAdmin("/events");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveEvent failed:", error);
    return { ok: false, error: "Could not save the event. Please try again." };
  }
}

export async function deleteEvent(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.churchEvent.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteEvent failed:", error);
  }
  revalidateAdmin("/events");
}

/* Ministries ----------------------------------------------------------- */

export async function saveMinistry(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const id = nonEmpty(formData.get("id")) || nextId("min");
  const name = nonEmpty(formData.get("name"));
  if (!name) return { ok: false, error: "Please provide a ministry name." };

  const data = {
    name,
    tagline: nonEmpty(formData.get("tagline")),
    description: nonEmpty(formData.get("description")),
    leader: optional(formData.get("leader")),
    image: nonEmpty(formData.get("image")),
    contact: optional(formData.get("contact")),
    order: asInt(formData.get("order"), 0),
  };

  try {
    await gate.client.ministry.upsert({ where: { id }, update: data, create: { id, ...data } });
    revalidateAdmin("/ministries");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveMinistry failed:", error);
    return { ok: false, error: "Could not save the ministry. Please try again." };
  }
}

export async function deleteMinistry(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.ministry.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteMinistry failed:", error);
  }
  revalidateAdmin("/ministries");
}

/* Leaders ---------------------------------------------------------------- */

export async function saveLeader(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const id = nonEmpty(formData.get("id")) || nextId("lead");
  const name = nonEmpty(formData.get("name"));
  if (!name) return { ok: false, error: "Please provide a leader name." };

  const data = {
    name,
    position: nonEmpty(formData.get("position")),
    bio: nonEmpty(formData.get("bio")),
    image: nonEmpty(formData.get("image")),
    order: asInt(formData.get("order"), 0),
  };

  try {
    await gate.client.leader.upsert({ where: { id }, update: data, create: { id, ...data } });
    revalidateAdmin("/leadership");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveLeader failed:", error);
    return { ok: false, error: "Could not save the leader. Please try again." };
  }
}

export async function deleteLeader(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.leader.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteLeader failed:", error);
  }
  revalidateAdmin("/leadership");
}

/* Gallery -------------------------------------------------------------- */

export async function saveAlbum(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const id = nonEmpty(formData.get("id")) || nextId("alb");
  const name = nonEmpty(formData.get("name"));
  if (!name) return { ok: false, error: "Please provide an album name." };

  const slug =
    nonEmpty(formData.get("slug")) ||
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const data = {
    slug,
    name,
    description: nonEmpty(formData.get("description")),
    cover: nonEmpty(formData.get("cover")) || "/images/worship-2.svg",
    order: asInt(formData.get("order"), 0),
  };

  try {
    await gate.client.galleryAlbum.upsert({ where: { id }, update: data, create: { id, ...data } });
    revalidateAdmin("/gallery");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveAlbum failed:", error);
    return { ok: false, error: "Could not save the album. Please try again." };
  }
}

export async function deleteAlbum(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.galleryAlbum.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteAlbum failed:", error);
  }
  revalidateAdmin("/gallery");
}

const MAX_IMAGE_BYTES = 25 * 1024 * 1024;

export async function saveGalleryImage(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const albumId = nonEmpty(formData.get("albumId"));
  const src = formData.get("src");
  if (!albumId) return { ok: false, error: "Please choose an album." };
  if (!(src instanceof File) || src.size === 0) {
    return { ok: false, error: "Please choose an image file to upload." };
  }
  if (src.size > MAX_IMAGE_BYTES) {
    return { ok: false, error: "The image is too large. Please pick a file under 25 MB." };
  }

  const album = await gate.client.galleryAlbum.findUnique({ where: { id: albumId } });
  if (!album) return { ok: false, error: "That album no longer exists." };

  const bytes = Buffer.from(await src.arrayBuffer());
  const dataUri = `data:${src.type};base64,${bytes.toString("base64")}`;

  const id = nextId("img");
  const caption = optional(formData.get("caption"));
  const alt = nonEmpty(formData.get("alt")) || caption || album.name;

  try {
    await gate.client.galleryImage.create({
      data: { id, albumId, src: dataUri, alt, caption },
    });
    revalidateAdmin("/gallery");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveGalleryImage failed:", error);
    return { ok: false, error: "Could not save the image. Please try again." };
  }
}

export async function deleteGalleryImage(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.galleryImage.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteGalleryImage failed:", error);
  }
  revalidateAdmin("/gallery");
}

/* Testimonials ------------------------------------------------------------ */

export async function setTestimonialStatus(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;

  try {
    await gate.client.testimonial.update({
      where: { id },
      data: { isApproved: formData.get("status") === "approve" },
    });
  } catch (error) {
    console.error("[admin] setTestimonialStatus failed:", error);
  }
  revalidateAdmin("/testimonials");
}

export async function deleteTestimonial(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.testimonial.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteTestimonial failed:", error);
  }
  revalidateAdmin("/testimonials");
}

/* Contact messages ---------------------------------------------------------- */

export async function deleteMessage(formData: FormData): Promise<void> {
  const gate = await guard();
  const id = nonEmpty(formData.get("id"));
  if ("error" in gate || !id) return;
  try {
    await gate.client.contactMessage.delete({ where: { id } });
  } catch (error) {
    console.error("[admin] deleteMessage failed:", error);
  }
  revalidateAdmin("/admin/messages");
  redirect("/admin/messages");
}

/* About / settings ----------------------------------------------------------- */

export async function saveAbout(
  _prev: AdminActionResult,
  formData: FormData,
): Promise<AdminActionResult> {
  const gate = await guard();
  if ("error" in gate) return { ok: false, error: gate.error };

  const data = {
    history: nonEmpty(formData.get("history"))
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean),
    vision: nonEmpty(formData.get("vision")),
    mission: nonEmpty(formData.get("mission")),
    leadersIntro: nonEmpty(formData.get("leadersIntro")),
    welcome: nonEmpty(formData.get("welcome")),
  };

  try {
    await gate.client.aboutContent.upsert({
      where: { id: "default" },
      update: data,
      create: { id: "default", ...data },
    });
    revalidateAdmin("/about");
    return { ok: true };
  } catch (error) {
    console.error("[admin] saveAbout failed:", error);
    return { ok: false, error: "Could not save the About settings. Please try again." };
  }
}