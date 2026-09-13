"use client";

import { useActionState } from "react";
import { login, type AuthState } from "@/lib/auth-actions";

const inputClasses =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-gold-400 focus:outline-none";

interface LoginFormProps {
  /** Where to send the visitor after a successful sign-in. */
  intent: "public" | "admin";
  submitLabel?: string;
}

export function LoginForm({ intent = "public", submitLabel = "Sign in" }: LoginFormProps) {
  const [state, formAction, pending] = useActionState<AuthState, FormData>(login, {});

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="intent" value={intent} />
      <div>
        <label htmlFor={`${intent}-email`} className="text-sm font-semibold text-white">
          Email address
        </label>
        <input
          id={`${intent}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClasses}
        />
      </div>
      <div>
        <label htmlFor={`${intent}-password`} className="text-sm font-semibold text-white">
          Password
        </label>
        <input
          id={`${intent}-password`}
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={inputClasses}
        />
      </div>

      {state?.error ? (
        <p role="alert" className="rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-200">
          {state.error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gold-400 px-7 text-[0.95rem] font-semibold text-brand-950 shadow-gold transition-all hover:-translate-y-0.5 hover:bg-gold-300 disabled:translate-y-0 disabled:opacity-60"
      >
        {pending ? "Signing in…" : submitLabel}
      </button>
    </form>
  );
}