import { Icon } from "@/components/ui/icon";

export function AdminDbBadge({ connected }: { connected: boolean }) {
  return (
    <span
      className={
        connected
          ? "inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700"
          : "inline-flex items-center gap-2 rounded-full bg-gold-50 px-3 py-1.5 text-xs font-bold text-gold-800"
      }
    >
      <span
        className={
          connected ? "h-2 w-2 rounded-full bg-emerald-500" : "h-2 w-2 rounded-full bg-gold-500"
        }
      />
      {connected ? "Database connected" : "Read-only — no database"}
    </span>
  );
}

/** Callout shown on every content page while the database is not connected. */
export function AdminReadOnlyBanner() {
  return (
    <div className="mb-6 flex items-start gap-3 rounded-2xl border border-gold-300/60 bg-gold-50 px-4 py-3 text-sm text-gold-900">
      <Icon name="sparkles" className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
      <p>
        <strong className="font-semibold">Read-only preview.</strong> No database is connected, so
        you&apos;re viewing the placeholder content and changes aren&apos;t saved. Connect{" "}
        <code className="rounded bg-white/70 px-1 py-0.5 text-[0.8em]">DATABASE_URL</code> to start
        editing.
      </p>
    </div>
  );
}