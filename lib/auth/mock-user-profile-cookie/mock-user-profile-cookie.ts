import { type MockUserProfileSnapshot } from "@/types/store/user-auth.types";

export function parseMockUserProfileCookie(
  value: string | undefined,
): MockUserProfileSnapshot | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const decoded = decodeURIComponent(value);
    const parsed: unknown = JSON.parse(decoded);

    if (!isRecord(parsed)) {
      return undefined;
    }

    const source =
      parsed.source === "login" || parsed.source === "registration"
        ? parsed.source
        : undefined;

    return {
      displayName: readString(parsed.displayName),
      phoneMasked: readString(parsed.phoneMasked),
      source,
    };
  } catch {
    return undefined;
  }
}

export function serializeMockUserProfileCookie(
  profile: MockUserProfileSnapshot,
): string {
  return encodeURIComponent(JSON.stringify(profile));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(value: unknown): string | undefined {
  return typeof value === "string" && value.trim() !== ""
    ? value.trim()
    : undefined;
}
