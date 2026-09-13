import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SECRET = process.env.AUTH_SECRET ?? "dev-secret-change-me";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * Authentication helpers (Phase 4).
 *
 * Passwords are hashed with scrypt (no external dependencies). Sessions are
 * stateless: the user id and an expiry are signed with an HMAC and stored in an
 * HttpOnly cookie (`session`). Reading a session only verifies the signature;
 * the durable source of truth for a user's role remains the database.
 */

/** Hashes a plaintext password with a random salt using scrypt. */
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const derived = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derived}`;
}

/** Verifies a plaintext password against a `hashPassword` output. */
export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, salt, expectedHex] = stored.split(":");
  if (scheme !== "scrypt" || !salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, 64);
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

interface SessionPayload {
  userId: string;
  expiresAt: number;
}

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("base64url");
}

function encode(payload: SessionPayload): string {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = sign(body);
  return `${body}.${signature}`;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(sign(body)))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (typeof payload.userId !== "string" || typeof payload.expiresAt !== "number") return null;
    return payload;
  } catch {
    return null;
  }
}

/** Creates a signed session token for a user id. */
export function createSessionToken(userId: string): string {
  return encode({ userId, expiresAt: Date.now() + SESSION_TTL_MS });
}

/** Validates and returns the session payload, or null when invalid/expired. */
export function readSessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const payload = decode(token);
  if (!payload || payload.expiresAt < Date.now()) return null;
  return payload;
}

/** Stable per-user cache-busting hash (e.g. for `cache()` reuse). */
export function fingerprint(...parts: (string | undefined)[]): string {
  return createHash("sha256").update(parts.filter(Boolean).join("|")).digest("hex").slice(0, 16);
}