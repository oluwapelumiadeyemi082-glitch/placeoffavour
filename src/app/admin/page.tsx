import { redirect } from "next/navigation";
import { getSignedInUser, logout } from "@/lib/auth-actions";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminIndexPage() {
  const user = await getSignedInUser();
  if (!user) redirect("/admin/login");

  return (
    <main className="min-h-[70vh] bg-cream-50 py-16 sm:py-20">
      <Container>
        <div className="mx-auto max-w-2xl rounded-3xl border border-brand-950/[0.06] bg-white p-8 shadow-soft sm:p-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-200 bg-gold-50 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-700">
            <Icon name="checkCircle" className="h-3.5 w-3.5" />
            Signed in
          </p>
          <h1 className="mt-5 font-display text-3xl font-medium text-brand-950">
            Welcome back
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">
            You are signed in with administrator access
            <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-900">
              {user.role.replace("_", " ")}
            </span>
            . The full content-management dashboard arrives in Phase 5 — this
            page confirms your session works.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/" variant="outline">
              <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
              Back to website
            </Button>
            <form action={logout}>
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </Container>
    </main>
  );
}