import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Logo } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <Container className="flex flex-1 flex-col items-center justify-center py-24 text-center">
        <Logo size="lg" />
        <p className="mt-10 font-display text-7xl font-semibold text-brand-950 sm:text-8xl">
          4<span className="text-gold-500">0</span>4
        </p>
        <h1 className="mt-4 font-display text-2xl font-medium text-brand-950 sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-500">
          The page you are looking for does not exist or has been moved. Let us
          take you somewhere quiet.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">
            Back Home
            <Icon name="arrowRight" className="h-4 w-4" />
          </Button>
          <Button href="/contact" variant="dark">
            Contact Us
          </Button>
        </div>
      </Container>
    </main>
  );
}