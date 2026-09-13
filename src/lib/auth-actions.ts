"use server";

import { redirect } from "next/navigation";
import { getDb } from "@/lib/db";
import { hashPassword, verifyPassword } from "@/lib/auth";
import { createSession, destroySession, getSessionUserId } from "@/lib/session";
import type { Role } from "@prisma/client";

export interface AuthState {
  error?: string;
}

/**
 * Fallback administrator account used while no database is configured.
 *
 * Set `ADMIN_EMAIL`/`ADMIN_PASSWORD` in the environment to override. Once a
 * database is connected the account in the `User` table takes precedence. The
 * defaults below are demo credentials — change them before a real launch.
 */
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL ?? "admin@placeoffavour.org").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Favour@2024";
const ENV_ADMIN_USER_ID = "env-admin";

/** Signs a visitor in. Returns `{ error }` for failures or redirects on success. */
export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const intent = String(formData.get("intent") ?? "public");

  if (!email || !password) {
    return { error: "Please provide your email and password." };
  }

  let userId: string | null = null;
  let role: Role | null = null;

  const client = getDb();
  if (client) {
    try {
      const user = await client.user.findUnique({ where: { email } });
      if (user?.passwordHash && verifyPassword(password, user.passwordHash)) {
        userId = user.id;
        role = user.role;
      }
    } catch (error) {
      console.error("[auth] login database error:", error);
    }
  }

  // Environment-configured admin account, used until the database is connected.
  if (role === null && email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    userId = ENV_ADMIN_USER_ID;
    role = "SUPER_ADMIN";
  }

  if (role === null || userId === null) {
    return { error: "Invalid email or password." };
  }

  if (intent === "admin" && role === "EDITOR") {
    return { error: "Your account does not have administrator access." };
  }

  await createSession(userId);
  redirect(intent === "admin" ? "/admin" : "/");
}

/** Signs the current visitor out. */
export async function logout(): Promise<void> {
  await destroySession();
  redirect("/");
}

/** Returns role + id for the signed-in user, or null. */
export async function getSignedInUser(): Promise<{ id: string; role: Role } | null> {
  const userId = await getSessionUserId();
  if (!userId) return null;

  if (userId === ENV_ADMIN_USER_ID) {
    return { id: userId, role: "SUPER_ADMIN" };
  }

  const client = getDb();
  if (!client) return null;
  try {
    const user = await client.user.findUnique({ where: { id: userId } });
    if (!user) return null;
    return { id: user.id, role: user.role };
  } catch (error) {
    console.error("[auth] getSignedInUser database error:", error);
    return null;
  }
}

/** Password hashing re-export so the seed script can reuse it. */
export { hashPassword };