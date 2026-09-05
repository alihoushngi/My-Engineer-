import assert from "node:assert/strict";
import test from "node:test";
import { applyCreateReview, mergeReviewOverlay } from "./review-store.ts";

const seed = {
  id: "rev-1",
  expertId: "eng-a",
  expertName: "مهندس",
  authorCustomerId: "user-sara",
  authorDisplayName: "سارا",
  relatedRequestId: "req-1",
  relatedServiceLabel: "نقشه برداری",
  rating: 5,
  text: "عالی بود.",
  dateLabel: "دیروز",
  createdAtMs: 10,
};

test("mergeReviewOverlay lets overlay reviews replace seed ids", () => {
  const merged = mergeReviewOverlay([seed], {
    reviews: [{ ...seed, text: "به‌روز شد", createdAtMs: 20 }],
  });
  assert.equal(merged[0]?.text, "به‌روز شد");
});

test("applyCreateReview prepends a new review", () => {
  const overlay = applyCreateReview(
    { reviews: [] },
    { ...seed, id: "rev-2", createdAtMs: 30 },
  );
  assert.equal(overlay.reviews[0]?.id, "rev-2");
});
