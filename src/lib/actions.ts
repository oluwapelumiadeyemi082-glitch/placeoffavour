"use server";

import { getDb } from "@/lib/db";

export interface SubmissionResult {
  ok: boolean;
  /** Whether the record was actually stored. False when no DB is connected. */
  persisted: boolean;
  error?: string;
}

/**
 * Stores a visitor's testimony for moderation. When the database is not yet
 * connected the submission is accepted client-side only (`persisted: false`),
 * preserving the pre-database behaviour.
 */
export async function submitTestimonial(input: {
  name: string;
  email?: string;
  message: string;
}): Promise<SubmissionResult> {
  const name = input.name.trim();
  const message = input.message.trim();
  const email = input.email?.trim() ?? null;

  if (!name || message.length < 10) {
    return {
      ok: false,
      persisted: false,
      error: "Please provide your name and a testimony of at least ten characters.",
    };
  }

  const client = getDb();
  if (!client) return { ok: true, persisted: false };

  try {
    await client.testimonial.create({
      data: {
        id: `test-${crypto.randomUUID()}`,
        name,
        email,
        message,
        isApproved: false,
      },
    });
    return { ok: true, persisted: true };
  } catch (error) {
    console.error("[actions] submitTestimonial failed:", error);
    return { ok: false, persisted: false, error: "Could not save your testimony. Please try again." };
  }
}

/** Stores a contact message for the church office (Phase 4 admin inbox). */
export async function submitContactMessage(input: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}): Promise<SubmissionResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject?.trim() || "General enquiry";
  const message = input.message.trim();
  const phone = input.phone?.trim() ?? null;

  if (!name || !email || message.length < 10) {
    return {
      ok: false,
      persisted: false,
      error: "Please fill in your name and email, and write a message of at least ten characters.",
    };
  }

  const client = getDb();
  if (!client) return { ok: true, persisted: false };

  try {
    await client.contactMessage.create({
      data: { name, email, phone, subject, message },
    });
    return { ok: true, persisted: true };
  } catch (error) {
    console.error("[actions] submitContactMessage failed:", error);
    return { ok: false, persisted: false, error: "Could not send your message. Please try again." };
  }
}