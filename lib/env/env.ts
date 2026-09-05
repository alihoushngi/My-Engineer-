export const env = {
  apiBaseUrl: (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim(),
  useMockData: process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "false",
} as const;

export type PublicEnv = typeof env;
