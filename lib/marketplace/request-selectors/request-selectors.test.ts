import assert from "node:assert/strict";
import test from "node:test";
import {
  excerptRequestSummary,
  filterRequestsForParty,
  parseSavedExpertIds,
  serializeSavedExpertIds,
  toggleSavedId,
} from "./request-selectors.ts";

test("filterRequestsForParty keeps the matching customer or expert", () => {
  const items = [
    { id: "1", customerId: "sara", expertId: "a" },
    { id: "2", customerId: "other", expertId: "a" },
    { id: "3", customerId: "sara", expertId: "b" },
  ];

  assert.deepEqual(
    filterRequestsForParty(items, { customerId: "sara" }).map(
      (item) => item.id,
    ),
    ["1", "3"],
  );
  assert.deepEqual(
    filterRequestsForParty(items, { expertId: "a" }).map((item) => item.id),
    ["1", "2"],
  );
});

test("toggleSavedId adds and removes without duplicating", () => {
  assert.deepEqual(toggleSavedId(["a"], "b"), ["a", "b"]);
  assert.deepEqual(toggleSavedId(["a", "b"], "a"), ["b"]);
});

test("saved-id cookie parse uses fallback for missing or invalid payloads", () => {
  const fallback = ["seed"];
  assert.deepEqual(parseSavedExpertIds(undefined, fallback), fallback);
  assert.deepEqual(parseSavedExpertIds("not-json", fallback), fallback);
  const encoded = serializeSavedExpertIds(["x", "y"]);
  assert.deepEqual(parseSavedExpertIds(encoded, fallback), ["x", "y"]);
  assert.deepEqual(parseSavedExpertIds(encodeURIComponent("[]"), fallback), []);
});

test("excerptRequestSummary keeps short text and trims long text", () => {
  assert.equal(excerptRequestSummary("کوتاه"), "کوتاه");
  const excerpt = excerptRequestSummary("الف".repeat(40), 10);
  assert.equal(excerpt.endsWith("…"), true);
  assert.ok(excerpt.length <= 11);
});
