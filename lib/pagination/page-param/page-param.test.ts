import assert from "node:assert/strict";
import test from "node:test";
import {
  buildPageHref,
  parsePageParam,
  resetPageParams,
} from "./page-param.ts";

test("parsePageParam defaults invalid and missing values to page 1", () => {
  assert.equal(parsePageParam(undefined), 1);
  assert.equal(parsePageParam(null), 1);
  assert.equal(parsePageParam(""), 1);
  assert.equal(parsePageParam("0"), 1);
  assert.equal(parsePageParam("-2"), 1);
  assert.equal(parsePageParam("abc"), 1);
});

test("parsePageParam reads a positive integer from a string or array", () => {
  assert.equal(parsePageParam("2"), 2);
  assert.equal(parsePageParam("3.9"), 3);
  assert.equal(parsePageParam(["4", "9"]), 4);
});

test("buildPageHref omits page 1 and preserves other query values", () => {
  assert.equal(buildPageHref("/articles", 1), "/articles");
  assert.equal(
    buildPageHref(
      "/search",
      2,
      "q=%D9%85%D9%87%D9%86%D8%AF%D8%B3&cities=rasht",
    ),
    "/search?q=%D9%85%D9%87%D9%86%D8%AF%D8%B3&cities=rasht&page=2",
  );
  assert.equal(buildPageHref("/search", 1, "q=test&page=4"), "/search?q=test");
});

test("resetPageParams drops an invalid leftover page", () => {
  const params = resetPageParams("category=surveying&page=9");
  assert.equal(params.get("category"), "surveying");
  assert.equal(params.has("page"), false);
});
