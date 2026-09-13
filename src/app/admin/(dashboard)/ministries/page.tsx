import { getAdminMinistries } from "@/lib/data/admin";
import { saveMinistry, deleteMinistry } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntityForm, EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Ministries" };

export default async function AdminMinistriesPage() {
  const dbConnected = Boolean(getDb());
  const ministries = await getAdminMinistries();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Ministries</h1>
        <p className="mt-1 text-sm text-ink-500">The ministries shown on /ministries.</p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs font-bold uppercase tracking-wide text-brand-800">
              <tr>
                <th className="px-4 py-3">Ministry</th>
                <th className="px-4 py-3">Leader</th>
                <th className="px-4 py-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-950/[0.05]">
              {ministries.map((ministry) => (
                <tr key={ministry.id} className="hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-800">{ministry.name}</p>
                    <p className="truncate text-xs text-ink-400">{ministry.tagline}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{ministry.leader || "—"}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteMinistry}>
                      <input type="hidden" name="id" value={ministry.id} />
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
          <h2 className="font-display text-xl font-medium text-brand-950">Add a ministry</h2>
          <div className="mt-4">
            <EntityForm
              action={saveMinistry}
              dbConnected={dbConnected}
              submitLabel={dbConnected ? "Add ministry" : "Add ministry (unavailable)"}
              fields={[
                { name: "name", label: "Name", type: "text" },
                { name: "tagline", label: "Tagline", type: "text" },
                { name: "description", label: "Description", type: "textarea", rows: 3 },
                { name: "leader", label: "Leader (optional)", type: "text" },
                { name: "contact", label: "Contact (optional)", type: "text" },
                { name: "image", label: "Image", type: "image" },
                { name: "order", label: "Order", type: "number", value: 0 },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}