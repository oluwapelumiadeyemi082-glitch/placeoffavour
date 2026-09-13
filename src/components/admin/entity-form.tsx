"use client";

import { useActionState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ImageField } from "@/components/admin/image-field";
import type { AdminActionResult } from "@/lib/admin-actions";

type Field =
  | { name: string; label: string; type: "text" | "url" | "date" | "number"; value?: string | number }
  | { name: string; label: string; type: "textarea"; value?: string; rows?: number }
  | { name: string; label: string; type: "image"; value?: string }
  | { name: string; label: string; type: "hidden"; value?: string };

const inputBase =
  "mt-1.5 w-full rounded-xl border border-brand-950/15 bg-white px-3 py-2.5 text-sm text-ink-800 placeholder:text-ink-300 focus:border-gold-400 focus:outline-none";

function FieldInput({ field }: { field: Field }) {
  if (field.type === "hidden") {
    return <input type="hidden" name={field.name} value={field.value ?? ""} />;
  }
  if (field.type === "image") {
    return <ImageField name={field.name} label={field.label} value={field.value} />;
  }
  const id = `field-${field.name}`;
  return (
    <div>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wide text-ink-500">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          id={id}
          name={field.name}
          rows={field.rows ?? 3}
          defaultValue={field.value ?? ""}
          className={cn(inputBase, "resize-y")}
        />
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type === "url" ? "url" : field.type}
          defaultValue={field.value ?? ""}
          className={inputBase}
        />
      )}
    </div>
  );
}

interface EntityFormProps {
  /** Server action used to save the record. */
  action: (_prev: AdminActionResult, formData: FormData) => Promise<AdminActionResult>;
  /** Field schema for this entity. */
  fields: Field[];
  /** Optional action to call after a successful save (e.g. re-enable form). */
  successMessage?: string;
  /** Whether the database is connected (disable form when false). */
  dbConnected: boolean;
  submitLabel?: string;
}

/** Generic admin add/edit form backed by a server action. */
export function EntityForm({
  action,
  fields,
  dbConnected,
  submitLabel = "Save",
  successMessage = "Saved.",
}: EntityFormProps) {
  const [state, formAction, pending] = useActionState<AdminActionResult, FormData>(action, {
    ok: false,
  });

  return (
    <form action={formAction} className="grid gap-4">
      {fields.map((field) => (
        <FieldInput key={field.name} field={field} />
      ))}

      {state?.error ? (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.error}
        </p>
      ) : state?.ok ? (
        <p role="status" className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {successMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending || !dbConnected}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gold-400 px-6 text-sm font-semibold text-brand-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:translate-y-0 disabled:opacity-50"
      >
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}

/** Small inline delete/submit button for lists. */
export function EntitySubmitButton({
  children,
  className,
  disabled,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full px-4 text-xs font-bold transition-colors disabled:opacity-50",
        className,
      )}
    >
      {children}
    </button>
  );
}