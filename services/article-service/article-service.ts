/**
 * Article catalog access.
 * API CONTRACT REQUIRED — no documented article list/detail endpoint exists.
 * Empty results are honest empty states, not invented article bodies.
 */
import {
  type Article,
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";
import { env } from "@/lib/env/env";
import { mockArticleCategories, mockArticles } from "@/lib/mock-data/mock-data";

export async function listArticles(): Promise<readonly ArticleCardData[]> {
  return env.useMockData ? mockArticles : [];
}

export async function listArticleCategories(): Promise<
  readonly ArticleCategory[]
> {
  return env.useMockData ? mockArticleCategories : [];
}

export async function getArticleCategory(
  _slug: string,
): Promise<ArticleCategory | null> {
  if (!env.useMockData) return null;
  return (
    mockArticleCategories.find((category) => category.slug === _slug) ?? null
  );
}

export async function listArticlesByCategory(
  _slug: string,
): Promise<readonly ArticleCardData[]> {
  return env.useMockData
    ? mockArticles.filter((article) => article.categorySlug === _slug)
    : [];
}

export async function getArticleBySlug(_slug: string): Promise<Article | null> {
  if (!env.useMockData) return null;
  return mockArticles.find((article) => article.slug === _slug) ?? null;
}
