type ServiceReview = {
  id: string;
  expertId: string;
  expertName: string;
  authorCustomerId: string;
  authorDisplayName: string;
  relatedRequestId: string;
  relatedServiceLabel: string;
  rating: number;
  text: string;
  dateLabel: string;
  createdAtMs: number;
  replyText?: string;
};

type ReviewOverlay = {
  reviews: readonly ServiceReview[];
};

export function parseReviewOverlayCookie(
  raw: string | undefined,
): ReviewOverlay {
  if (!raw) {
    return { reviews: [] };
  }

  try {
    const parsed: unknown = JSON.parse(decodeURIComponent(raw));

    if (!isRecord(parsed) || !Array.isArray(parsed.reviews)) {
      return { reviews: [] };
    }

    return {
      reviews: parsed.reviews.flatMap((item) => {
        const review = readReview(item);
        return review ? [review] : [];
      }),
    };
  } catch {
    return { reviews: [] };
  }
}

export function serializeReviewOverlayCookie(overlay: ReviewOverlay): string {
  return encodeURIComponent(JSON.stringify(overlay));
}

function readReview(value: unknown): ServiceReview | null {
  if (!isRecord(value)) {
    return null;
  }

  const id = readString(value.id);
  const expertId = readString(value.expertId);
  const expertName = readString(value.expertName);
  const authorCustomerId = readString(value.authorCustomerId);
  const authorDisplayName = readString(value.authorDisplayName);
  const relatedRequestId = readString(value.relatedRequestId);
  const relatedServiceLabel = readString(value.relatedServiceLabel);
  const text = readString(value.text);
  const dateLabel = readString(value.dateLabel);
  const createdAtMs = readNumber(value.createdAtMs);
  const rating = readNumber(value.rating);

  if (
    !id ||
    !expertId ||
    !expertName ||
    !authorCustomerId ||
    !authorDisplayName ||
    !relatedRequestId ||
    !relatedServiceLabel ||
    !text ||
    !dateLabel ||
    createdAtMs === undefined ||
    rating === undefined ||
    rating < 1 ||
    rating > 5
  ) {
    return null;
  }

  return {
    id,
    expertId,
    expertName,
    authorCustomerId,
    authorDisplayName,
    relatedRequestId,
    relatedServiceLabel,
    rating,
    text,
    dateLabel,
    createdAtMs,
    replyText: readString(value.replyText),
  };
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
