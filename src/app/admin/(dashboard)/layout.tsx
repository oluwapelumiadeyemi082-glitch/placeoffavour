import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSignedInUser } from "@/lib/auth-actions";
import { getDb } from "@/lib/db";
import { AdminSidebar } from "@/components/admin/sidebar";
import { AdminDbBadge } from "@/components/admin/db-badge";

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSignedInUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#eef2f7]">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-brand-950/10 bg-white px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-inc-400 text-ink-400">
              Place of Favour
            </p>
            <p className="mt-0.5 text-sm font-medium text-ink-600">
              Signed in as{" "}
              <span className="font-semibold text-brand-800">{user.role.replace("_", " ")}</span>
            </p>
          </div>
          <AdminDbBadge connected={Boolean(getDb())} />
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}