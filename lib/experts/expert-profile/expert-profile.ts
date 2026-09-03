import {
  type ExpertContact,
  type ExpertProfile,
} from "@/types/store/expert.types";

export const developmentExpertPreviewIds = [
  "dev-preview",
  "dev-preview-sparse",
] as const;

export type DevelopmentExpertPreviewId =
  (typeof developmentExpertPreviewIds)[number];

const developmentPreviewIdSet = new Set<string>(developmentExpertPreviewIds);

export function isDevelopmentExpertPreviewId(
  id: string,
): id is DevelopmentExpertPreviewId {
  return developmentPreviewIdSet.has(id);
}

export function hasText(value: string | undefined): value is string {
  return typeof value === "string" && value.trim() !== "";
}

export function hasItems<T>(
  value: readonly T[] | undefined,
): value is readonly T[] {
  return Array.isArray(value) && value.length > 0;
}

export function getPublicPhone(
  contact: ExpertContact | undefined,
): string | undefined {
  if (!contact) {
    return undefined;
  }

  if (hasText(contact.phone)) {
    return contact.phone.trim();
  }

  return undefined;
}

export function getPublicSms(
  contact: ExpertContact | undefined,
): string | undefined {
  if (!contact) {
    return undefined;
  }

  if (hasText(contact.sms)) {
    return contact.sms.trim();
  }

  return getPublicPhone(contact);
}

export function hasPublicContact(profile: ExpertProfile): boolean {
  return (
    getPublicPhone(profile.contact) !== undefined ||
    getPublicSms(profile.contact) !== undefined
  );
}

export function getExpertInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];

  if (!first) {
    return "";
  }

  const last = parts[parts.length - 1];

  if (!last || last === first) {
    return first.slice(0, 1);
  }

  return `${first.slice(0, 1)}${last.slice(0, 1)}`;
}

export function getReviewCount(profile: ExpertProfile): number | undefined {
  if (typeof profile.reviewCount === "number") {
    return profile.reviewCount;
  }

  if (hasItems(profile.reviews)) {
    return profile.reviews.length;
  }

  return undefined;
}

export function toExpertSharePath(id: string): `/experts/${string}` {
  return `/experts/${id}`;
}
