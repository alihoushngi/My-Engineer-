import assert from "node:assert/strict";
import test from "node:test";
import { getVisiblePages } from "./visible-pages.ts";

test("getVisiblePages lists every page when the count is compact", () => {
  assert.deepEqual(
    getVisiblePages(1, 5),
    [1, 2, 3, 4, 5].map((page) => ({ type: "page", page })),
  );
});

test("getVisiblePages never emits more than seven page numbers", () => {
  const tokens = getVisiblePages(10, 40);
  const pageButtons = tokens.filter((token) => token.type === "page");

  assert.ok(pageButtons.length <= 5);
  assert.ok(tokens.length <= 7);
  assert.deepEqual(tokens[0], { type: "page", page: 1 });
  assert.deepEqual(tokens.at(-1), { type: "page", page: 40 });
  assert.equal(
    tokens.some((token) => token.type === "page" && token.page === 10),
    true,
  );
});

test("getVisiblePages keeps neighbors at the start and end of a long range", () => {
  assert.deepEqual(
    getVisiblePages(1, 20).map((token) =>
      token.type === "page" ? token.page : token.key,
    ),
    [1, 2, "end", 20],
  );
  assert.deepEqual(
    getVisiblePages(20, 20).map((token) =>
      token.type === "page" ? token.page : token.key,
    ),
    [1, "start", 19, 20],
  );
});
