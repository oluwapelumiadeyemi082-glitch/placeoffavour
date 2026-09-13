import { cookies } from "next/headers";
import { createSessionToken, readSessionToken } from "@/lib/auth";

const COOKIE_NAME = "session";

/**
 * Cookie-based session helpers.
 *
 * Only call these from Server Components, Server Actions or Route Handlers —
 * never from Client Components. `cookies()` is an async API in this Next.js
 * version, so every helper awaits it.
 */

/** Reads and validates the current session cookie. Returns the user id or null. */
export async function getSessionUserId(): Promise<string | null> {
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  return readSessionToken(token)?.userId ?? null;
}

/** Writes a signed session cookie (HttpOnly) for the given user id. */
export async function createSession(userId: string): Promise<void> {
  const token = createSessionToken(userId);
  (await cookies()).set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 7 * 24 * 60 * 60,
  });
}

/** Deletes the session cookie. */
export async function destroySession(): Promise<void> {
  (await cookies()).delete(COOKIE_NAME);
}

/** Session cookie name, exported for anything that needs the exact value. */
export { COOKIE_NAME as sessionCookieName };