import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import {
  getAdminServices,
  getAdminSermons,
  getAdminEvents,
  getAdminMinistries,
  getAdminLeaders,
  getAdminTestimonials,
  getAdminMessages,
  getAdminGalleryAlbums,
} from "@/lib/data/admin";
import { getDb } from "@/lib/db";
import { AdminReadOnlyBanner } from "@/components/admin/db-badge";

export const metadata = {
  title: "Dashboard",
};

function StatCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: number;
  href: string;
  icon: "clock" | "bookOpen" | "calendar" | "users" | "heart" | "flame" | "mail" | "sparkles";
}) {
  return (
    <Button
      href={href}
      variant="outline"
      className="h-auto flex-col items-start gap-3 rounded-2xl p-5 text-left"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <span className="flex flex-col gap-1">
        <span className="font-display text-3xl font-medium text-brand-950">{value}</span>
        <span className="text-sm font-semibold text-ink-500">{label}</span>
      </span>
    </Button>
  );
}

export default async function AdminDashboardPage() {
  const dbConnected = Boolean(getDb());
  const [services, sermons, events, ministries, leaders, testimonials, messages, albums] =
    await Promise.all([
      getAdminServices(),
      getAdminSermons(),
      getAdminEvents(),
      getAdminMinistries(),
      getAdminLeaders(),
      getAdminTestimonials(),
      getAdminMessages(),
      getAdminGalleryAlbums(),
    ]);

  const pending = testimonials.filter((t) => !t.isApproved).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-3xl font-medium text-brand-950">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-500">
          An overview of the content powering the public website.
        </p>
      </div>

      {!dbConnected ? <AdminReadOnlyBanner /> : null}

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
        <StatCard label="Services" value={services.length} href="/admin/services" icon="clock" />
        <StatCard label="Sermons" value={sermons.length} href="/admin/sermons" icon="bookOpen" />
        <StatCard label="Events" value={events.length} href="/admin/events" icon="calendar" />
        <StatCard label="Ministries" value={ministries.length} href="/admin/ministries" icon="users" />
        <StatCard label="Leaders" value={leaders.length} href="/admin/leaders" icon="heart" />
        <StatCard label="Gallery albums" value={albums.length} href="/admin/gallery" icon="sparkles" />
        <StatCard label="Testimonials" value={testimonials.length} href="/admin/testimonials" icon="flame" />
        <StatCard label="Messages" value={messages.length} href="/admin/messages" icon="mail" />
      </div>

      {pending > 0 ? (
        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-gold-300/60 bg-gold-50 px-5 py-4">
          <Icon name="flame" className="h-5 w-5 text-gold-600" />
          <p className="text-sm text-gold-900">
            <span className="font-semibold">{pending} testimony{pending === 1 ? "" : "ies"}</span>{" "}
            awaiting moderation.
          </p>
          <Button href="/admin/testimonials" variant="dark" size="sm" className="ml-auto">
            Review
          </Button>
        </div>
      ) : null}
    </div>
  );
}