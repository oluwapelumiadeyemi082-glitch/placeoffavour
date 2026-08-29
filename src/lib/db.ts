import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

/**
 * Database availability gate.
 *
 * The site ships with full static placeholder content so the public pages work
 * before (and without) a live database. When `DATABASE_URL` is configured — and
 * only then — the data-access layer in `src/lib/data` queries Postgres (Neon).
 *
 * Passwords/users/auth land in Phase 4; the tables already exist in the schema.
 */
export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

/** Lazily-created PrismaClient. Returns null when no database is configured. */
export function getDb(): PrismaClient | null {
  if (!hasDatabase()) return null;
  const client =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
    });
  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
  return client;
}

export const db = getDb();

/**
 * Runs a query against the database when it is configured and reachable,
 * falling back to `fallback` when it is not available, when a table is empty
 * (fresh database before the seed runs), or when a query errors.
 */
export async function withDb<T>(
  query: (client: PrismaClient) => Promise<T[]>,
  fallback: T[],
): Promise<T[]> {
  const client = getDb();
  if (!client) return fallback;
  try {
    const rows = await query(client);
    return rows.length > 0 ? rows : fallback;
  } catch (error) {
    console.error("[db] query failed, falling back to static content:", error);
    return fallback;
  }
}