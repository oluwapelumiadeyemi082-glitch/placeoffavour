"use client";

import { useState } from "react";
import { submitContactMessage } from "@/lib/actions";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "submitted";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-brand-950/10 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder:text-ink-400 focus:border-gold-500 focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim() || undefined;
    const subject = String(data.get("subject") ?? "").trim() || undefined;

    if (!name || !email || !message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setStatus("submitting");
    const result = await submitContactMessage({ name, email, phone, subject, message });
    if (!result.ok && result.error) {
      setError(result.error);
      setStatus("idle");
      return;
    }
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className="rounded-2xl border border-gold-200 bg-gold-50 p-8 text-center">
        <p className="font-display text-2xl font-semibold text-brand-950">
          Message received
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gold-800">
          Thank you for reaching out. Your message has been recorded securely and
          our office team will respond as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="text-sm font-semibold text-brand-950">
            Name <span className="text-gold-700">*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            required
            autoComplete="name"
            placeholder="Your full name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="text-sm font-semibold text-brand-950">
            Email <span className="text-gold-700">*</span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="text-sm font-semibold text-brand-950">
            Phone <span className="text-ink-400">(optional)</span>
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+234 000 000 0000"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm font-semibold text-brand-950">
            Subject <span className="text-ink-400">(optional)</span>
          </label>
          <input
            id="contact-subject"
            name="subject"
            placeholder="How can we help?"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-semibold text-brand-950">
          Message <span className="text-gold-700">*</span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          placeholder="Write your message here…"
          className={cn(inputClasses, "resize-y")}
        />
      </div>

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold-400 px-7 text-[0.95rem] font-semibold text-brand-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:opacity-60"
      >
        Send Message
      </button>
    </form>
  );
}