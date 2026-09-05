import { type MockEngineerProfileSnapshot } from "@/types/store/engineer-auth.types";

export function parseMockEngineerProfileCookie(
  value: string | undefined,
): MockEngineerProfileSnapshot | undefined {
  if (!value) {
    return undefined;
  }

  try {
    const decoded = decodeURIComponent(value);
    const parsed: unknown = JSON.parse(decoded);

    if (!isRecord(parsed)) {
      return undefined;
    }

    return {
      firstName: readString(parsed.firstName),
      lastName: readString(parsed.lastName),
      profession: readString(parsed.profession),
      cityId: readString(parsed.cityId),
      cityName: readString(parsed.cityName),
      provinceId: readString(parsed.provinceId),
      provinceName: readString(parsed.provinceName),
      specialties: readStringArray(parsed.specialties),
      software: readStringArray(parsed.software),
      experienceYears: readNumber(parsed.experienceYears),
      resumeText: readString(parsed.resumeText),
      educationLabels: readStringArray(parsed.educationLabels),
      isOrganizationMember: readBoolean(parsed.isOrganizationMember),
    };
  } catch {
    return undefined;
  }
}

export function serializeMockEngineerProfileCookie(
  profile: MockEngineerProfileSnapshot,
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

function readNumber(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value)
    ? value
    : undefined;
}

function readBoolean(value: unknown): boolean | undefined {
  return typeof value === "boolean" ? value : undefined;
}

function readStringArray(value: unknown): readonly string[] | undefined {
  if (!Array.isArray(value)) {
    return undefined;
  }

  const items = value.filter(
    (item): item is string => typeof item === "string" && item.trim() !== "",
  );

  return items.length > 0 ? items : undefined;
}
