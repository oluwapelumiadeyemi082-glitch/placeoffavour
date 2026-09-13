"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icon";

const inputBase =
  "mt-1.5 w-full rounded-xl border border-brand-950/15 bg-white px-3 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none";

interface ImageFieldProps {
  name: string;
  label: string;
  value?: string;
  disabled?: boolean;
}

function fileToDataUri(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

/**
 * Admin upload field: lets the admin pick an image file, converts it to a
 * base64 data URI, and stores that in the record. A preview is shown next to
 * a small note about the chosen storage. Also accepts a direct URL for
 * existing values (or remote images).
 */
export function ImageField({ name, label, value, disabled }: ImageFieldProps) {
  const [dataUri, setDataUri] = useState<string>("");
  const [preview, setPreview] = useState<string>(value ?? "");
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function handleChange(file: File | undefined | null) {
    if (!file || !file.type.startsWith("image/")) return;
    const uri = await fileToDataUri(file);
    setDataUri(uri);
    setPreview(uri);
  }

  const current = dataUri || value || "";

  return (
    <div>
      <label htmlFor={`field-image-${name}`} className="text-xs font-bold uppercase tracking-wide text-ink-500">
        {label}
      </label>

      <div className="mt-1.5 flex items-start gap-3">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={disabled}
          className="inline-flex items-center gap-2 rounded-xl border border-dashed border-brand-950/25 bg-brand-50/60 px-4 py-3 text-sm font-semibold text-brand-800 transition-colors hover:border-gold-400 hover:bg-gold-50 disabled:opacity-50"
        >
          <Icon name="upload" className="h-4 w-4" />
          {preview ? "Replace image" : "Upload image"}
        </button>

        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="Preview" className="h-20 w-32 rounded-xl object-cover shadow-soft" />
        ) : (
          <p className="text-xs leading-relaxed text-ink-500">
            Pick a .jpg, .png or .webp file. It is stored in the database and
            shown on the public site.
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        id={`file-${name}`}
        type="file"
        accept="image/*"
        className="hidden"
        disabled={disabled}
        onChange={(e) => void handleChange(e.target.files?.[0])}
      />

      <input
        type="hidden"
        name={name}
        value={current}
        readOnly
        className={cn(inputBase, "mt-3")}
      />
    </div>
  );
}