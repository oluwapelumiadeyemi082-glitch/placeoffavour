"use client";

import { useActionState, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { saveGalleryImage } from "@/lib/admin-actions";
import type { AdminActionResult } from "@/lib/admin-actions";

interface GalleryImageFormProps {
  albumId: string;
  albumName: string;
  dbConnected: boolean;
}

/**
 * Uploads a photo into a specific album. The file is submitted to a server
 * action, converted to base64, and stored in the database so the public
 * gallery shows it immediately.
 */
export function GalleryImageForm({ albumId, albumName, dbConnected }: GalleryImageFormProps) {
  const [state, formAction, pending] = useActionState<AdminActionResult, FormData>(
    saveGalleryImage,
    { ok: false },
  );

  const [fileName, setFileName] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form action={formAction} className="mt-4 rounded-xl border border-brand-950/10 bg-brand-50/50 p-4">
      <input type="hidden" name="albumId" value={albumId} />

      <p className="text-sm font-semibold text-brand-900">
        Add a photo to &ldquo;{albumName}&rdquo;
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={pending || !dbConnected}
          className="inline-flex items-center gap-2 rounded-full border border-brand-950/20 bg-white px-4 py-2 text-xs font-bold text-brand-800 transition-colors hover:border-gold-400 disabled:opacity-50"
        >
          <Icon name="upload" className="h-4 w-4" />
          {fileName ? "Choose another file" : "Choose file"}
        </button>

        {fileName ? (
          <span className="max-w-[180px] truncate text-xs text-ink-600">{fileName}</span>
        ) : (
          <span className="text-xs text-ink-500">.jpg, .png or .webp, up to 25 MB</span>
        )}

        <input
          ref={inputRef}
          type="file"
          name="src"
          accept="image/*"
          required
          className="hidden"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_2fr]">
        <input
          type="text"
          name="caption"
          placeholder="Caption (optional)"
          className="w-full rounded-xl border border-brand-950/15 bg-white px-3 py-2 text-sm text-ink-800 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none"
        />
        <input
          type="text"
          name="alt"
          placeholder="Alternative text for accessibility"
          className="w-full rounded-xl border border-brand-950/15 bg-white px-3 py-2 text-sm text-ink-800 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none"
        />
      </div>

      {state?.error ? (
        <p role="alert" className="mt-3 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-700">
          {state.error}
        </p>
      ) : state?.ok ? (
        <p role="status" className="mt-3 rounded-xl bg-emerald-50 px-4 py-2.5 text-sm text-emerald-700">
          Photo uploaded — it now appears on the public gallery.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || !dbConnected}
        className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-full bg-gold-400 px-5 text-sm font-semibold text-brand-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:translate-y-0 disabled:opacity-50"
      >
        {pending ? "Uploading…" : "Upload photo"}
      </button>
    </form>
  );
}