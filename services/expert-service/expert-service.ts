import {
  type ExpertCardData,
  type ExpertProfile,
} from "@/types/store/expert.types";
import { getDevExpertPreview } from "@/lib/experts/dev-expert-preview/dev-expert-preview";
import { env } from "@/lib/env/env";
import { mockExpertCards, mockExperts } from "@/lib/mock-data/mock-data";
import { overlayExpertProfileReviews } from "@/lib/reviews/overlay-expert-reviews/overlay-expert-reviews";
import { readReviewCatalog } from "@/lib/reviews/mock-review-overlay/mock-review-overlay";

/**
 * Public expert profile access.
 * API CONTRACT REQUIRED: no documented GET expert-by-id endpoint exists.
 * Do not call invented URLs from this module.
 *
 * The development preview is a local layout fixture, not an API response.
 */
export async function getExpertProfile(
  id: string,
): Promise<ExpertProfile | null> {
  if (env.useMockData) {
    const expert = mockExperts.find((item) => item.id === id) ?? null;

    if (!expert) {
      return null;
    }

    return overlayExpertProfileReviews(expert, await readReviewCatalog());
  }

  if (process.env.NODE_ENV !== "production") {
    return getDevExpertPreview(id);
  }

  return null;
}

export async function getExpertCardData(
  id: string,
): Promise<ExpertCardData | null> {
  if (!env.useMockData) {
    return null;
  }

  return mockExpertCards.find((expert) => expert.id === id) ?? null;
}
