import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";

export const metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1a36] py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_80%_10%,rgba(204,155,47,0.22),transparent_60%)]"
      />
      <Container>
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo variant="light" />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-200">
              <Icon name="sparkles" className="h-3.5 w-3.5" />
              Administration
            </p>
            <h1 className="mt-5 font-display text-2xl font-medium text-white">
              Sign in to the dashboard
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Secure administrator authentication arrives in a later build phase.
              In the meantime, the public website is fully browsable.
            </p>
          </div>
          <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a1a36]/60 p-5 text-center text-sm text-white/70">
            Login form coming soon — Phase 4
          </div>
          <Link
            href="/"
            className="mt-8 flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
          >
            <Icon name="arrowRight" className="h-4 w-4 rotate-180" />
            Back to the website
          </Link>
        </div>
      </Container>
    </main>
  );
}