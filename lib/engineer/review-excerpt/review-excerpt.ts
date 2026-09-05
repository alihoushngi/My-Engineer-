const DEFAULT_MAX_LENGTH = 140;

export function excerptReviewText(
  text: string,
  maxLength = DEFAULT_MAX_LENGTH,
): string {
  const normalized = text.trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength).trimEnd()}…`;
}
