import assert from "node:assert/strict";
import test from "node:test";
import { paginateItems } from "./paginate-items.ts";

test("paginateItems hides pagination at the page-size boundary", () => {
  const items = Array.from({ length: 9 }, (_, index) => index + 1);
  const result = paginateItems(items, 1);

  assert.deepEqual(result.items, items);
  assert.equal(result.hasPagination, false);
  assert.equal(result.pageCount, 1);
});

test("paginateItems paginates when the result count is greater than 9", () => {
  const items = Array.from({ length: 10 }, (_, index) => index + 1);
  const firstPage = paginateItems(items, 1);
  const secondPage = paginateItems(items, 2);

  assert.deepEqual(firstPage.items, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
  assert.deepEqual(secondPage.items, [10]);
  assert.equal(firstPage.hasPagination, true);
  assert.equal(secondPage.pageCount, 2);
});

test("paginateItems clamps an out-of-range page", () => {
  const items = [1, 2, 3];
  const result = paginateItems(items, 8, 2);

  assert.equal(result.page, 2);
  assert.deepEqual(result.items, [3]);
});

test("paginateItems returns an empty first page for no results", () => {
  const result = paginateItems([], 3);

  assert.deepEqual(result.items, []);
  assert.equal(result.page, 1);
  assert.equal(result.hasPagination, false);
});
