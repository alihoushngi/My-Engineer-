/**
 * Server-only customer access reads.
 * Do not import this module from Client Components.
 */

import { getEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import {
  getUserSession,
  readRawUserSessionCookie,
} from "@/lib/auth/user-session/user-session";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { MOCK_USER_SESSION_VALUE } from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { type UserAccessResult } from "@/types/store/user-auth.types";

export async function getUserAccess(): Promise<UserAccessResult> {
  const session = await getUserSession();

  if (session) {
    return { kind: "authenticated", session };
  }

  const engineerSession = await getEngineerSession();

  if (engineerSession) {
    return { kind: "engineer_session" };
  }

  const rawCookie = await readRawUserSessionCookie();

  if (rawCookie !== undefined && rawCookie !== MOCK_USER_SESSION_VALUE) {
    return { kind: "expired" };
  }

  if (rawCookie === MOCK_USER_SESSION_VALUE && !isMockUserAuthEnabled()) {
    return { kind: "expired" };
  }

  if (isMockUserAuthEnabled()) {
    return { kind: "unauthenticated" };
  }

  return { kind: "unavailable" };
}

export async function isUserAuthenticated(): Promise<boolean> {
  const access = await getUserAccess();
  return access.kind === "authenticated";
}
