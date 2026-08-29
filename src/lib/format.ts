export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

/** e.g. 24 Aug */
export function formatEventDate(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
  });
}

/** e.g. 24 Aug 2026 */
export function formatShortDate(iso: string): string {
  return parseDate(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Stable date ordering for ISO date strings (YYYY-MM-DD). */
export function sortByDate<T extends { date: string }>(
  items: T[],
  dir: "asc" | "desc" = "asc",
): T[] {
  return [...items].sort((a, b) => {
    const diff = a.date.localeCompare(b.date);
    return dir === "asc" ? diff : -diff;
  });
}