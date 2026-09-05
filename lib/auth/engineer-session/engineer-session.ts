import { cookies } from "next/headers";
import {
  isMockAuthEnabled,
  isMockLoginEnabled,
  isMockRegisterEnabled,
} from "@/config/mock-auth.config/mock-auth.config";
import {
  MOCK_ENGINEER_PROFILE_COOKIE,
  MOCK_ENGINEER_SESSION_COOKIE,
  MOCK_ENGINEER_SESSION_VALUE,
  MOCK_SESSION_COOKIE_OPTIONS,
  MOCK_USER_PROFILE_COOKIE,
  MOCK_USER_SAVED_COOKIE,
  MOCK_USER_SESSION_COOKIE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import { parseMockEngineerProfileCookie } from "@/lib/auth/mock-engineer-profile-cookie/mock-engineer-profile-cookie";
import { type EngineerSession } from "@/types/store/engineer-auth.types";

export async function getEngineerSession(): Promise<EngineerSession | null> {
  if (!isMockAuthEnabled()) {
    return null;
  }

  const store = await cookies();
  const sessionValue = store.get(MOCK_ENGINEER_SESSION_COOKIE)?.value;

  if (sessionValue !== MOCK_ENGINEER_SESSION_VALUE) {
    return null;
  }

  const profile = parseMockEngineerProfileCookie(
    store.get(MOCK_ENGINEER_PROFILE_COOKIE)?.value,
  );
  const source = profile ? "registration" : "login";

  if (source === "login" && !isMockLoginEnabled()) {
    return null;
  }

  if (
    source === "registration" &&
    !isMockRegisterEnabled() &&
    !isMockLoginEnabled()
  ) {
    return null;
  }

  return {
    isAuthenticated: true,
    role: "engineer",
    isMock: true,
    source,
    profile,
  };
}

export async function writeMockEngineerSession(input: {
  source: "login" | "registration";
  profileCookieValue?: string;
}): Promise<void> {
  if (!isMockAuthEnabled()) {
    return;
  }

  const store = await cookies();

  store.delete(MOCK_USER_SESSION_COOKIE);
  store.delete(MOCK_USER_PROFILE_COOKIE);
  store.delete(MOCK_USER_SAVED_COOKIE);

  store.set({
    name: MOCK_ENGINEER_SESSION_COOKIE,
    value: MOCK_ENGINEER_SESSION_VALUE,
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });

  if (input.source === "registration" && input.profileCookieValue) {
    store.set({
      name: MOCK_ENGINEER_PROFILE_COOKIE,
      value: input.profileCookieValue,
      ...MOCK_SESSION_COOKIE_OPTIONS,
    });
    return;
  }

  store.delete(MOCK_ENGINEER_PROFILE_COOKIE);
}

export async function clearMockEngineerSession(): Promise<void> {
  const store = await cookies();
  store.delete(MOCK_ENGINEER_SESSION_COOKIE);
  store.delete(MOCK_ENGINEER_PROFILE_COOKIE);
}
