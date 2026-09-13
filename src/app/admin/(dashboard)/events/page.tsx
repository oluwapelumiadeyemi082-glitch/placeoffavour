import { getAdminEvents } from "@/lib/data/admin";
import { saveEvent, deleteEvent } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntityForm, EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Events" };

export default async function AdminEventsPage() {
  const dbConnected = Boolean(getDb());
  const events = await getAdminEvents();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Events</h1>
        <p className="mt-1 text-sm text-ink-500">Upcoming events and programmes shown on /events.</p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-brand-950/[0.06] bg-white shadow-soft">
          <table className="w-full text-left text-sm">
            <thead className="bg-brand-50 text-xs font-bold uppercase tracking-wide text-brand-800">
              <tr>
                <th className="px-4 py-3">Event</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3 text-right">Delete</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-950/[0.05]">
              {events.map((eventItem) => (
                <tr key={eventItem.id} className="hover:bg-cream-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-ink-800">{eventItem.title}</p>
                    <p className="truncate text-xs text-ink-400">{eventItem.description}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-600">{eventItem.date}</td>
                  <td className="px-4 py-3 text-ink-600">{eventItem.location}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteEvent}>
                      <input type="hidden" name="id" value={eventItem.id} />
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
          <h2 className="font-display text-xl font-medium text-brand-950">Add an event</h2>
          <div className="mt-4">
            <EntityForm
              action={saveEvent}
              dbConnected={dbConnected}
              submitLabel={dbConnected ? "Add event" : "Add event (unavailable)"}
              fields={[
                { name: "title", label: "Title", type: "text" },
                { name: "date", label: "Date", type: "date" },
                { name: "endDate", label: "End date (optional)", type: "date" },
                { name: "time", label: "Time", type: "text" },
                { name: "location", label: "Location", type: "text" },
                { name: "description", label: "Description", type: "textarea", rows: 3 },
                { name: "image", label: "Image URL", type: "url" },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}