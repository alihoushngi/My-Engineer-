/**
 * Article catalog access.
 * API CONTRACT REQUIRED — no documented article list/detail endpoint exists.
 * Do not invent article bodies or demo cards.
 */
import {
  type Article,
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";

export async function listArticles(): Promise<readonly ArticleCardData[]> {
  return [];
}

export async function listArticleCategories(): Promise<
  readonly ArticleCategory[]
> {
  return [];
}

export async function getArticleCategory(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _slug: string,
): Promise<ArticleCategory | null> {
  return null;
}

export async function listArticlesByCategory(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _slug: string,
): Promise<readonly ArticleCardData[]> {
  return [];
}

export async function getArticleBySlug(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _slug: string,
): Promise<Article | null> {
  return null;
}
