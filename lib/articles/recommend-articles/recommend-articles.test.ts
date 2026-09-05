import assert from "node:assert/strict";
import test from "node:test";
import { recommendArticles } from "./recommend-articles.ts";

const catalog = [
  {
    slug: "featured-design",
    categorySlug: "design",
    tags: ["نما", "پلان"],
    featured: true,
    viewCount: 10,
  },
  {
    slug: "utm-guide",
    categorySlug: "surveying",
    tags: ["utm", "سند"],
    viewCount: 80,
  },
  {
    slug: "deed-map",
    categorySlug: "surveying",
    tags: ["سند", "ثبت"],
    viewCount: 20,
  },
  {
    slug: "crew",
    categorySlug: "construction",
    tags: ["اجرا"],
    viewCount: 5,
  },
] as const;

test("recommendArticles prefers featured, category, then shared tags", () => {
  const recommended = recommendArticles(catalog, {
    categorySlug: "surveying",
    seedTags: ["سند"],
    excludeSlugs: ["utm-guide"],
    limit: 2,
  });

  assert.deepEqual(
    recommended.map((item) => item.slug),
    ["deed-map", "featured-design"],
  );
});

test("recommendArticles is deterministic and skips excluded slugs", () => {
  const first = recommendArticles(catalog, { limit: 3 });
  const second = recommendArticles(catalog, { limit: 3 });

  assert.deepEqual(
    first.map((item) => item.slug),
    ["featured-design", "utm-guide", "deed-map"],
  );
  assert.deepEqual(
    second.map((item) => item.slug),
    first.map((item) => item.slug),
  );
});
