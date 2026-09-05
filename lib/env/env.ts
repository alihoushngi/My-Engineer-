import { parsePublicBool } from "@/lib/auth/parse-public-bool/parse-public-bool";

function parseOptionalPublicBool(
  value: string | undefined,
): boolean | undefined {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return undefined;
}

export const env = {
  apiBaseUrl: (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim(),
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false",
  mockRegisterOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_REGISTER,
  ),
  mockLoginOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_LOGIN,
  ),
  mockUserRegisterOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER,
  ),
  mockUserLoginOverride: parseOptionalPublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN,
  ),
  /** Client-safe approximation for chrome; server still reads mock-auth.config. */
  publicMockRegisterEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_REGISTER,
    true,
  ),
  publicMockLoginEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_LOGIN,
    true,
  ),
  publicMockUserRegisterEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_REGISTER,
    true,
  ),
  publicMockUserLoginEnabled: parsePublicBool(
    process.env.NEXT_PUBLIC_ENABLE_MOCK_USER_LOGIN,
    true,
  ),
} as const;

export type PublicEnv = typeof env;
