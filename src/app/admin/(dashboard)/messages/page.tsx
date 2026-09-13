import { getAdminMessages } from "@/lib/data/admin";
import { deleteMessage } from "@/lib/admin-actions";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";
import { EntitySubmitButton } from "@/components/admin/entity-form";
import { Icon } from "@/components/ui/icon";

export const metadata = { title: "Messages" };

export default async function AdminMessagesPage() {
  const dbConnected = Boolean(getDb());
  const messages = await getAdminMessages();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Messages</h1>
        <p className="mt-1 text-sm text-ink-500">
          Enquiries submitted through the public contact form.
        </p>
      </div>

      {!dbConnected ? (
        <>
          <AdminReadOnlyBanner />
          <p className="rounded-2xl border border-brand-950/[0.06] bg-white px-5 py-10 text-center text-sm text-ink-400 shadow-soft">
            Contact messages are only stored once a database is connected. Nothing has arrived yet in
            this environment.
          </p>
        </>
      ) : messages.length === 0 ? (
        <p className="rounded-2xl border border-brand-950/[0.06] bg-white px-5 py-10 text-center text-sm text-ink-400 shadow-soft">
          No messages yet.
        </p>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => (
            <article
              key={message.id}
              className="rounded-2xl border border-brand-950/[0.06] bg-white p-5 shadow-soft"
            >
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold text-ink-800">{message.name}</p>
                <a
                  href={`mailto:${message.email}`}
                  className="text-sm text-brand-700 hover:underline"
                >
                  {message.email}
                </a>
                <span className="text-xs text-ink-400">
                  {message.createdAt ? new Date(message.createdAt).toLocaleString() : ""}
                </span>
                <form action={deleteMessage} className="ml-auto inline-flex">
                  <input type="hidden" name="id" value={message.id} />
                  <EntitySubmitButton className="bg-red-50 text-red-600 hover:bg-red-100">
                    <Icon name="trash" className="h-3.5 w-3.5" />
                    Delete
                  </EntitySubmitButton>
                </form>
              </div>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-gold-700">
                {message.subject || "General enquiry"}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-ink-600">{message.message}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}