import { getAdminServices } from "@/lib/data/admin";
import { saveService, deleteService } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntityForm, EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const dbConnected = Boolean(getDb());
  const services = await getAdminServices();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Weekly services</h1>
        <p className="mt-1 text-sm text-ink-500">
          The services shown on the homepage and /services.
        </p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs font-bold uppercase tracking-wide text-brand-800">
              <tr>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Day</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-950/[0.05]">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-800">{service.title}</p>
                    <p className="truncate text-xs text-ink-400">{service.description}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{service.day}</td>
                  <td className="px-4 py-3 text-ink-600">{service.time}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteService}>
                      <input type="hidden" name="id" value={service.id} />
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
          <h2 className="font-display text-xl font-medium text-brand-950">Add a service</h2>
          <p className="mt-1 text-sm text-ink-500">Pick a descriptive title, e.g. &ldquo;Sunday Service&rdquo;.</p>
          <div className="mt-4">
            <EntityForm
              action={saveService}
              dbConnected={dbConnected}
              submitLabel={dbConnected ? "Add service" : "Add service (unavailable)"}
              fields={[
                { name: "title", label: "Title", type: "text" },
                { name: "day", label: "Day", type: "text" },
                { name: "time", label: "Time", type: "text" },
                { name: "location", label: "Location", type: "text" },
                { name: "description", label: "Description", type: "textarea", rows: 3 },
                { name: "image", label: "Image URL", type: "url" },
                { name: "order", label: "Order", type: "number", value: 0 },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}