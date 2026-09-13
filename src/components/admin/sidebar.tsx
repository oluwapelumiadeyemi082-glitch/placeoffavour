"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/auth-actions";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: "sparkles" as const },
  { href: "/admin/services", label: "Services", icon: "clock" as const },
  { href: "/admin/sermons", label: "Sermons", icon: "bookOpen" as const },
  { href: "/admin/events", label: "Events", icon: "calendar" as const },
  { href: "/admin/ministries", label: "Ministries", icon: "users" as const },
  { href: "/admin/leaders", label: "Leaders", icon: "heart" as const },
  { href: "/admin/gallery", label: "Gallery", icon: "sparkles" as const },
  { href: "/admin/testimonials", label: "Testimonials", icon: "flame" as const },
  { href: "/admin/messages", label: "Messages", icon: "mail" as const },
  { href: "/admin/about", label: "About & Settings", icon: "globe" as const },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex min-h-screen w-64 shrink-0 flex-col border-r border-brand-800 bg-brand-950 text-white">
      <div className="border-b border-brand-800 px-6 py-5">
        <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-gold-300">
          Place of Favour
        </p>
        <p className="mt-1 text-sm font-semibold text-white">Admin dashboard</p>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-gold-400 text-brand-950"
                  : "text-white/70 hover:bg-white/[0.06] hover:text-white",
              )}
            >
              <Icon name={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-brand-800 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <Icon name="external" className="h-4 w-4" />
          View website
        </Link>
        <form action={logout} className="flex">
          <input type="hidden" name="target" value="/admin/login" />
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <Icon name="close" className="h-4 w-4" />
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}