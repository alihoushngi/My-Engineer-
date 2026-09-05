import assert from "node:assert/strict";
import test from "node:test";
import { excerptReviewText } from "./review-excerpt.ts";

test("excerptReviewText keeps short text unchanged", () => {
  assert.equal(excerptReviewText("کار دقیق بود."), "کار دقیق بود.");
});

test("excerptReviewText trims and shortens long text", () => {
  const text = "الف".repeat(160);
  const excerpt = excerptReviewText(text, 20);
  assert.equal(excerpt.endsWith("…"), true);
  assert.equal(excerpt.length, 21);
});
