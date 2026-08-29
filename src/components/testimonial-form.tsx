"use client";

import { useState } from "react";
import { submitTestimonial } from "@/lib/actions";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "submitted";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-brand-950/10 bg-white px-4 py-2.5 text-sm text-brand-950 placeholder:text-ink-400 focus:border-gold-500 focus:outline-none";

export function TestimonialForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    if (message.trim().length < 10) {
      setError("Please share a little more — your testimony should be at least ten characters.");
      return;
    }
    if (!consent) {
      setError("Please give your consent for us to share your testimony.");
      return;
    }
    setStatus("submitting");
    const result = await submitTestimonial({ name, email, message });
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
          Thank you, {name || "friend"}!
        </p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-gold-800">
          Your testimony has been received and will be reviewed by our team before
          being published. To God be the glory!
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="space-y-5">
      <p className="rounded-xl bg-brand-50 px-4 py-3 text-xs leading-relaxed text-brand-800">
        Submission is moderated: testimonies are reviewed by our team before they
        are published.
      </p>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="test-name" className="text-sm font-semibold text-brand-950">
            Your name <span className="text-gold-700">*</span>
          </label>
          <input
            id="test-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Sister Grace"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="test-email" className="text-sm font-semibold text-brand-950">
            Email <span className="text-ink-400">(optional)</span>
          </label>
          <input
            id="test-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>
      <div>
        <label htmlFor="test-message" className="text-sm font-semibold text-brand-950">
          Your testimony <span className="text-gold-700">*</span>
        </label>
        <textarea
          id="test-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What has God done in your life?"
          className={cn(inputClasses, "resize-y")}
        />
      </div>
      <label className="flex items-start gap-3 text-sm text-ink-600">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-brand-950/20 accent-gold-600"
        />
        <span>
          I give my consent for this testimony to be reviewed and, if approved,
          published on the church website. <span className="text-gold-700">*</span>
        </span>
      </label>

      {error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex h-12 items-center justify-center rounded-full bg-gold-400 px-7 text-[0.95rem] font-semibold text-brand-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting…" : "Share Your Testimony"}
      </button>
    </form>
  );
}