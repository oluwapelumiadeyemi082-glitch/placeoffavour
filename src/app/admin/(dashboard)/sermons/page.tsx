import { getAdminSermons } from "@/lib/data/admin";
import { saveSermon, deleteSermon } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntityForm, EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Sermons" };

export default async function AdminSermonsPage() {
  const dbConnected = Boolean(getDb());
  const sermons = await getAdminSermons();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Sermons</h1>
        <p className="mt-1 text-sm text-ink-500">Audio/video sermons shown on /sermons.</p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs font-bold uppercase tracking-wide text-brand-800">
              <tr>
                <th className="px-4 py-3">Sermon</th>
                <th className="px-4 py-3">Preacher</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-950/[0.05]">
              {sermons.map((sermon) => (
                <tr key={sermon.id} className="hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-800">{sermon.title}</p>
                    <p className="truncate text-xs text-ink-400">{sermon.scripture}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{sermon.preacher}</td>
                  <td className="px-4 py-3 text-ink-600">{sermon.date}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteSermon}>
                      <input type="hidden" name="id" value={sermon.id} />
                      <EntitySubmitButton
                        disabled={!dbConnected}
                        className="bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50"
                      >
                        <Icon name="close" className="h-3.5 w-3.5" />
                        Delete
                      </EntitySubmitButton>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="rounded-2xl border border-brand-950/[0.06] bg-white p-6 shadow-soft">
          <h2 className="font-display text-xl font-medium text-brand-950">Add a sermon</h2>
          <div className="mt-4">
            <EntityForm
              action={saveSermon}
              dbConnected={dbConnected}
              submitLabel={dbConnected ? "Add sermon" : "Add sermon (unavailable)"}
              fields={[
                { name: "title", label: "Title", type: "text" },
                { name: "preacher", label: "Preacher", type: "text" },
                { name: "date", label: "Date", type: "date" },
                { name: "scripture", label: "Scripture", type: "text" },
                { name: "description", label: "Description", type: "textarea", rows: 3 },
                { name: "image", label: "Image URL", type: "url" },
                { name: "audioUrl", label: "Audio URL (optional)", type: "url" },
                { name: "videoUrl", label: "Video URL (optional)", type: "url" },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}