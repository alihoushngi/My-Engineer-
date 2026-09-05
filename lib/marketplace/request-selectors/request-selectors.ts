export type RequestPartyFilter = {
  customerId?: string;
  expertId?: string;
};

export function filterRequestsForParty<
  T extends { customerId?: string; expertId?: string },
>(items: readonly T[], filter: RequestPartyFilter): readonly T[] {
  return items.filter((item) => {
    if (filter.customerId && item.customerId !== filter.customerId) {
      return false;
    }

    if (filter.expertId && item.expertId !== filter.expertId) {
      return false;
    }

    return true;
  });
}

export function toggleSavedId(
  ids: readonly string[],
  expertId: string,
): readonly string[] {
  if (ids.includes(expertId)) {
    return ids.filter((id) => id !== expertId);
  }

  return [...ids, expertId];
}

export function parseSavedExpertIds(
  raw: string | undefined,
  fallback: readonly string[],
): readonly string[] {
  if (raw === undefined) {
    return fallback;
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));

    if (!Array.isArray(parsed)) {
      return fallback;
    }

    const ids = parsed.filter(
      (item): item is string => typeof item === "string" && item.trim() !== "",
    );

    return ids;
  } catch {
    return fallback;
  }
}

export function serializeSavedExpertIds(ids: readonly string[]): string {
  return encodeURIComponent(JSON.stringify(ids));
}

export function excerptRequestSummary(description: string, max = 80): string {
  const normalized = description.trim().replace(/\s+/g, " ");

  if (normalized.length <= max) {
    return normalized;
  }

  return `${normalized.slice(0, max).trimEnd()}…`;
}
