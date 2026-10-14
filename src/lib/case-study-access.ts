import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * One password (`CASE_STUDY_PASSWORD`) unlocks every case study marked
 * `protected`. If it's unset, nothing unlocks them.
 */
export const ACCESS_COOKIE = "case-study-access";
export const ACCESS_MAX_AGE = 60 * 60 * 24 * 30;

function password() {
  return process.env.CASE_STUDY_PASSWORD || undefined;
}

/** The cookie value: an HMAC keyed by the password, so changing the password locks everyone out again. */
export function accessToken() {
  const secret = password();
  return secret ? createHmac("sha256", secret).update(ACCESS_COOKIE).digest("hex") : undefined;
}

/** Constant-time compare: hashing both sides evens out their lengths. */
function safeEqual(a: string, b: string) {
  const hash = (s: string) => createHmac("sha256", ACCESS_COOKIE).update(s).digest();
  return timingSafeEqual(hash(a), hash(b));
}

export function checkPassword(attempt: string) {
  const secret = password();
  return secret !== undefined && safeEqual(attempt, secret);
}

/** Whether this request has unlocked protected case studies. Reads cookies, so call it behind Suspense. */
export async function hasAccess() {
  const expected = accessToken();
  const cookie = (await cookies()).get(ACCESS_COOKIE)?.value;
  return expected !== undefined && cookie !== undefined && safeEqual(cookie, expected);
}
