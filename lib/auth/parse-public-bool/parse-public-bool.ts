export function parsePublicBool(
  value: string | undefined,
  fallback: boolean,
): boolean {
  if (value === "true") {
    return true;
  }

  if (value === "false") {
    return false;
  }

  return fallback;
}
