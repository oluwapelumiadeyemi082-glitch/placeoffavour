import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { Icon } from "@/components/ui/icon";
import { LoginForm } from "@/components/auth/login-form";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: `Sign in to your ${site.name} account.`,
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a1a36] py-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_15%_15%,rgba(74,119,164,0.22),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_90%_90%,rgba(204,155,47,0.18),transparent_60%)]"
      />
      <Container>
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.05] p-8 backdrop-blur-sm sm:p-10">
          <div className="flex flex-col items-center text-center">
            <Logo variant="light" />
            <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-gold-300/30 bg-gold-300/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold-200">
              <Icon name="users" className="h-3.5 w-3.5" />
              Member area
            </p>
            <h1 className="mt-5 font-display text-2xl font-medium text-white">
              Welcome back
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-white/60">
              Sign in to access your member area and stay connected with your
              church family.
            </p>
          </div>
          <div className="mt-8">
            <LoginForm intent="public" submitLabel="Sign in" />
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