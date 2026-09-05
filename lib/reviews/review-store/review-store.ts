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
};

type ReviewOverlay = {
  reviews: readonly ServiceReview[];
};

export function mergeReviewOverlay(
  seed: readonly ServiceReview[],
  overlay: ReviewOverlay,
): readonly ServiceReview[] {
  const byId = new Map(seed.map((item) => [item.id, item]));

  for (const item of overlay.reviews) {
    byId.set(item.id, item);
  }

  return [...byId.values()].sort(
    (left, right) => right.createdAtMs - left.createdAtMs,
  );
}

export function applyCreateReview(
  overlay: ReviewOverlay,
  review: ServiceReview,
): ReviewOverlay {
  return {
    reviews: [
      review,
      ...overlay.reviews.filter((item) => item.id !== review.id),
    ],
  };
}
