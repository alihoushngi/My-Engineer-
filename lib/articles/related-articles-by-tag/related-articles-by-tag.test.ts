import assert from "node:assert/strict";
import test from "node:test";
import { relatedArticlesByTag } from "./related-articles-by-tag.ts";

const catalog = [
  { slug: "current", categorySlug: "surveying", tags: ["utm", "سند"] },
  { slug: "shared-tags", categorySlug: "design", tags: ["utm", "سند"] },
  { slug: "one-tag", categorySlug: "construction", tags: ["سند"] },
  { slug: "same-category", categorySlug: "surveying", tags: ["پهپاد"] },
  { slug: "unrelated", categorySlug: "design", tags: ["نور"] },
] as const;

test("relatedArticlesByTag ranks shared tags before same-category fallback", () => {
  const related = relatedArticlesByTag(catalog, catalog[0], 3);

  assert.deepEqual(
    related.map((item) => item.slug),
    ["shared-tags", "one-tag", "same-category"],
  );
});

test("relatedArticlesByTag excludes the current article and unrelated items", () => {
  const related = relatedArticlesByTag(catalog, catalog[0], 10);

  assert.equal(
    related.some((item) => item.slug === "current"),
    false,
  );
  assert.equal(
    related.some((item) => item.slug === "unrelated"),
    false,
  );
});
