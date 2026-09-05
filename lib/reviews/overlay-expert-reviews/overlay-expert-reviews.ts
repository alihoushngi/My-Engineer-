import { mergePublicReviews } from "@/lib/reviews/review-projections/review-projections";
import { type ExpertProfile } from "@/types/store/expert.types";
import { type ServiceReview } from "@/types/store/review.types";

export function overlayExpertProfileReviews(
  expert: ExpertProfile,
  reviews: readonly ServiceReview[],
): ExpertProfile {
  const merged = mergePublicReviews(expert.reviews, reviews, expert.id);

  if (merged === expert.reviews) {
    return expert;
  }

  const extraCount = merged.length - (expert.reviews?.length ?? 0);

  return {
    ...expert,
    reviews: merged,
    reviewCount:
      (expert.reviewCount ?? expert.reviews?.length ?? 0) + extraCount,
  };
}
