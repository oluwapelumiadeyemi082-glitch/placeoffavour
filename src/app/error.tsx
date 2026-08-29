"use client";

import { useEffect } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream-50">
        <main className="flex flex-1 flex-col">
          <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-950 text-gold-300">
              <Icon name="sparkles" className="h-7 w-7" />
            </span>
            <h1 className="mt-6 font-display text-3xl font-medium text-brand-950">
              Something went wrong
            </h1>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
              An unexpected error occurred. Please try again. If the problem
              persists, contact the church office.
            </p>
            <div className="mt-8 flex gap-3">
              <Button onClick={() => reset()} variant="dark">
                Try Again
              </Button>
              <Button href="/">Back Home</Button>
            </div>
            {process.env.NODE_ENV === "development" ? (
              <p className="mt-8 max-w-md break-all rounded-lg bg-red-50 p-4 text-left font-mono text-xs text-red-700">
                {error.message}
              </p>
            ) : null}
          </Container>
        </main>
      </body>
    </html>
  );
}