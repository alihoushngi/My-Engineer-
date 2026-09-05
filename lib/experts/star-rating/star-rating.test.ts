import assert from "node:assert/strict";
import test from "node:test";
import { getFilledStarCount } from "./star-rating.ts";

test("getFilledStarCount rounds a valid rating into a 0–5 star count", () => {
  assert.equal(getFilledStarCount(4.5), 5);
  assert.equal(getFilledStarCount(4.4), 4);
  assert.equal(getFilledStarCount(0.2), 0);
  assert.equal(getFilledStarCount(9), 5);
});

test("getFilledStarCount rejects non-finite values", () => {
  assert.equal(getFilledStarCount(Number.NaN), 0);
  assert.equal(getFilledStarCount(Number.POSITIVE_INFINITY), 0);
});
