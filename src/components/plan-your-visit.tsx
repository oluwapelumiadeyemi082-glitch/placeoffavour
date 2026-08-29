import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";

const steps = [
  {
    icon: "clock" as const,
    title: "Arrive early",
    note: "Come a few minutes before the service begins so you can settle in comfortably.",
  },
  {
    icon: "sparkles" as const,
    title: "Come as you are",
    note: "Wear what is comfortable for worship. You will be welcomed warmly.",
  },
  {
    icon: "users" as const,
    title: "You're our guest",
    note: "Let any of our ushers know you're visiting — we would love to help you settle in.",
  },
  {
    icon: "bookOpen" as const,
    title: "Children are welcome",
    note: "We have programmes for children and young people during our services.",
  },
];

export function PlanYourVisit() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-brand-950 p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_55%_at_90%_0%,rgba(204,155,47,0.22),transparent_60%)]"
          />
          <div className="relative">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold-300">
              <Icon name="sparkles" className="h-4 w-4" />
              Visiting for the first time?
            </p>
            <h2 className="mt-4 font-display max-w-xl text-2xl font-medium leading-tight tracking-tight text-balance text-white sm:text-3xl">
              Plan your visit — here is what to expect
            </h2>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                    <Icon name={step.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{step.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}