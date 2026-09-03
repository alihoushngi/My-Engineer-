export const env = {
  apiBaseUrl: (process.env.NEXT_PUBLIC_API_BASE_URL ?? "").trim(),
} as const;

export type PublicEnv = typeof env;
