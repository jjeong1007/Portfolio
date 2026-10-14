"use server";

import { refresh } from "next/cache";
import { cookies } from "next/headers";
import { ACCESS_COOKIE, ACCESS_MAX_AGE, accessToken, checkPassword } from "@/lib/case-study-access";

export type UnlockState = { error?: string };

/** Checks the case study password and, if it's right, sets the access cookie and re-renders the page. */
export async function unlockCaseStudy(_prev: UnlockState, formData: FormData): Promise<UnlockState> {
  const attempt = formData.get("password");
  if (typeof attempt !== "string" || !checkPassword(attempt)) {
    // Slow down guessing
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { error: "That password isn't right." };
  }

  (await cookies()).set(ACCESS_COOKIE, accessToken()!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/projects",
    maxAge: ACCESS_MAX_AGE,
  });
  refresh();
  return {};
}
