import { cookies } from "next/headers";
import {
  MOCK_REVIEWS_COOKIE,
  MOCK_SESSION_COOKIE_OPTIONS,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import {
  parseReviewOverlayCookie,
  serializeReviewOverlayCookie,
} from "@/lib/reviews/review-overlay-cookie/review-overlay-cookie";
import { mergeReviewOverlay } from "@/lib/reviews/review-store/review-store";
import { mockServiceReviews } from "@/lib/mock-data/review-mock-data";
import {
  type ReviewOverlay,
  type ServiceReview,
} from "@/types/store/review.types";

export async function readReviewOverlay(): Promise<ReviewOverlay> {
  const store = await cookies();
  return parseReviewOverlayCookie(store.get(MOCK_REVIEWS_COOKIE)?.value);
}

export async function writeReviewOverlay(
  overlay: ReviewOverlay,
): Promise<void> {
  const store = await cookies();
  store.set({
    name: MOCK_REVIEWS_COOKIE,
    value: serializeReviewOverlayCookie(overlay),
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });
}

export async function readReviewCatalog(): Promise<readonly ServiceReview[]> {
  return mergeReviewOverlay(mockServiceReviews, await readReviewOverlay());
}
