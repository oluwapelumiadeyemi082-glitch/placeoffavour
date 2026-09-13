import { getAdminAbout } from "@/lib/data/admin";
import { saveAbout } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntityForm } from "@/components/admin/entity-form";

export const metadata = { title: "About &amp Settings" };

export default async function AdminAboutPage() {
  const dbConnected = Boolean(getDb());
  const about = await getAdminAbout();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">About &amp; Settings</h1>
        <p className="mt-1 text-sm text-ink-500">
          The free-text copy shown on the /about page. Put one history paragraph per line.
        </p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft lg:col-span-2">
          <EntityForm
            action={saveAbout}
            dbConnected={dbConnected}
            submitLabel={dbConnected ? "Save About" : "Save About (unavailable)"}
            fields={[
              { name: "welcome", label: "Welcome", type: "textarea", rows: 2, value: about.welcome },
              { name: "vision", label: "Vision", type: "textarea", rows: 2, value: about.vision },
              { name: "mission", label: "Mission", type: "textarea", rows: 2, value: about.mission },
              {
                name: "leadersIntro",
                label: "Leaders introduction",
                type: "textarea",
                rows: 2,
                value: about.leadersIntro,
              },
              {
                name: "history",
                label: "History (one paragraph per line)",
                type: "textarea",
                rows: 5,
                value: about.history.join("\n"),
              },
            ]}
          />
        </section>
      </div>
    </div>
  );
}