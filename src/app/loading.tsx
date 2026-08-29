export default function Loading() {
  return (
    <div aria-hidden="true" className="min-h-[60vh] animate-pulse">
      <div className="h-64 bg-brand-900/15 sm:h-80" />
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto h-4 w-40 rounded-full bg-brand-900/10" />
        <div className="mx-auto mt-5 h-10 w-72 rounded-full bg-brand-900/10" />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-white shadow-soft">
              <div className="aspect-[16/9] rounded-t-2xl bg-brand-900/10" />
              <div className="space-y-3 p-6">
                <div className="h-4 w-1/2 rounded-full bg-brand-900/10" />
                <div className="h-3 w-5/6 rounded-full bg-brand-900/10" />
                <div className="h-3 w-2/3 rounded-full bg-brand-900/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}