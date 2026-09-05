/**
 * Combines the production safety gate, config flag, and optional env override.
 * Production (`canUse === false`) always wins.
 */
export function resolveMockFlag(
  canUse: boolean,
  configEnabled: boolean,
  envOverride: boolean | undefined,
): boolean {
  if (!canUse) {
    return false;
  }

  if (envOverride === false) {
    return false;
  }

  if (envOverride === true) {
    return true;
  }

  return configEnabled;
}
