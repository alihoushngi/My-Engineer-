/**
 * Production safety boundary for development-only mock authentication.
 * Mock credentials and fake sessions must never be active in production.
 */
export function canUseMocks(): boolean {
  return process.env.NODE_ENV !== "production";
}
