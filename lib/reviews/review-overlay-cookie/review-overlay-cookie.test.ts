import assert from "node:assert/strict";
import test from "node:test";
import {
  parseReviewOverlayCookie,
  serializeReviewOverlayCookie,
} from "./review-overlay-cookie.ts";

test("review overlay cookie round-trips a review", () => {
  const overlay = {
    reviews: [
      {
        id: "rev-1",
        expertId: "eng-a",
        expertName: "مهندس",
        authorCustomerId: "user-sara",
        authorDisplayName: "سارا",
        relatedRequestId: "req-1",
        relatedServiceLabel: "نقشه برداری",
        rating: 4,
        text: "خوب بود.",
        dateLabel: "الان",
        createdAtMs: 20,
      },
    ],
  };
  const parsed = parseReviewOverlayCookie(
    serializeReviewOverlayCookie(overlay),
  );
  assert.equal(parsed.reviews[0]?.id, "rev-1");
  assert.equal(parsed.reviews[0]?.rating, 4);
});

test("invalid review overlay cookies become empty", () => {
  assert.deepEqual(parseReviewOverlayCookie(undefined), { reviews: [] });
  assert.deepEqual(parseReviewOverlayCookie("%7Bnope"), { reviews: [] });
});
