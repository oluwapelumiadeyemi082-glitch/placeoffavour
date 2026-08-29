import type { Testimonial } from "@/types/content";

/**
 * PLACEHOLDER CONTENT (Phase 1) — see src/lib/content/services.ts for notes.
 * Only approved testimonies are displayed (isApproved === true).
 */

export const testimonies: Testimonial[] = [
  {
    id: "test-1",
    name: "Bro. Samuel",
    message:
      "I found a family at Place of Favour. The teaching of God's word transformed the way I live, work and relate with others.",
    isApproved: true,
  },
  {
    id: "test-2",
    name: "Sis. Blessing",
    message:
      "After months of persistent prayer at this altar, God answered the cry of my heart. To God be the glory!",
    isApproved: true,
  },
  {
    id: "test-3",
    name: "Deaconess Esther",
    message:
      "This is truly a place of favour. The atmosphere of worship here is unlike anything I have experienced.",
    isApproved: true,
  },
  {
    id: "test-4",
    name: "Bro. Emmanuel",
    message:
      "Through the prayers and support of this church family, my business that had shut down is back on its feet. Thank you, Jesus!",
    isApproved: true,
  },
  {
    id: "test-5",
    name: "Sis. Peace",
    message:
      "I walked in broken and hurting, but the love I found here mended my heart. This church truly cares for people.",
    isApproved: true,
  },
  {
    id: "test-pending-1",
    name: "Bro. [Visitor]",
    message: "[Awaiting review — this testimony was submitted by a visitor and is queued for moderation.]",
    isApproved: false,
  },
];