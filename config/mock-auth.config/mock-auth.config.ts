import { env } from "@/lib/env/env";
import { canUseMocks } from "@/lib/auth/can-use-mocks/can-use-mocks";
import { resolveMockFlag } from "@/lib/auth/resolve-mock-flag/resolve-mock-flag";

/**
 * Central source of truth for development mock authentication.
 *
 * Toggle `mockRegister.enabled` and `mockLogin.enabled` here.
 * Optional env overrides: NEXT_PUBLIC_ENABLE_MOCK_REGISTER / LOGIN.
 *
 * DO NOT ENABLE MOCK AUTH IN PRODUCTION.
 * `canUseMocks()` is false when NODE_ENV === "production".
 *
 * This module is imported from server/middleware code only.
 * Do not import it from Client Components.
 */
export const mockAuthConfig = {
  mockRegister: {
    enabled: true,
    /** Must match registration OTP_LENGTH (5 digits). Not the login OTP. */
    otp: "12345",
    delayMs: 300,
    forceError: false,
  },
  mockLogin: {
    enabled: true,
    phone: "09115447316",
    otp: "123456",
    password: "admin1234",
    delayMs: 300,
    forceError: false,
  },
} as const;

export function isMockRegisterEnabled(): boolean {
  return resolveMockFlag(
    canUseMocks(),
    mockAuthConfig.mockRegister.enabled,
    env.mockRegisterOverride,
  );
}

export function isMockLoginEnabled(): boolean {
  return resolveMockFlag(
    canUseMocks(),
    mockAuthConfig.mockLogin.enabled,
    env.mockLoginOverride,
  );
}

export function isMockAuthEnabled(): boolean {
  return isMockRegisterEnabled() || isMockLoginEnabled();
}
