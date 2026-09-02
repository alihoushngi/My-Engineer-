export const env = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "",
} as const;

export type PublicEnv = typeof env;
