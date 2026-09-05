import assert from "node:assert/strict";
import test from "node:test";
import {
  canCustomerReviewRequest,
  findEligibleRequestForExpert,
} from "./review-eligibility.ts";

const closed = {
  id: "req-1",
  status: "closed",
  customerId: "user-sara",
  expertId: "eng-a",
};

test("only the request owner can review a closed request once", () => {
  assert.equal(
    canCustomerReviewRequest({
      request: closed,
      customerId: "user-sara",
      reviews: [],
    }),
    true,
  );
  assert.equal(
    canCustomerReviewRequest({
      request: { ...closed, status: "sent" },
      customerId: "user-sara",
      reviews: [],
    }),
    false,
  );
  assert.equal(
    canCustomerReviewRequest({
      request: closed,
      customerId: "other",
      reviews: [],
    }),
    false,
  );
  assert.equal(
    canCustomerReviewRequest({
      request: closed,
      customerId: "user-sara",
      reviews: [{ relatedRequestId: "req-1", authorCustomerId: "user-sara" }],
    }),
    false,
  );
});

test("findEligibleRequestForExpert returns the matching closed request", () => {
  const other = {
    id: "req-2",
    status: "closed",
    customerId: "user-sara",
    expertId: "eng-b",
  };
  assert.equal(
    findEligibleRequestForExpert([closed, other], [], "user-sara", "eng-b")?.id,
    "req-2",
  );
  assert.equal(
    findEligibleRequestForExpert([closed], [], "user-sara", "missing"),
    undefined,
  );
});
