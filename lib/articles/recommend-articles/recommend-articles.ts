export type RecommendableArticle = {
  slug: string;
  categorySlug?: string;
  tags?: readonly string[];
  featured?: boolean;
  viewCount?: number;
};

export type RecommendArticlesOptions = {
  excludeSlugs?: readonly string[];
  categorySlug?: string;
  seedTags?: readonly string[];
  limit?: number;
};

export function recommendArticles<T extends RecommendableArticle>(
  articles: readonly T[],
  options: RecommendArticlesOptions = {},
): T[] {
  const limit = Math.max(0, options.limit ?? 3);
  const excluded = new Set(options.excludeSlugs ?? []);
  const category =
    options.categorySlug && options.categorySlug !== "all"
      ? options.categorySlug
      : undefined;
  const seedTags = new Set(options.seedTags ?? []);

  return articles
    .filter((article) => !excluded.has(article.slug))
    .map((article) => ({
      article,
      score: scoreArticle(article, category, seedTags),
    }))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      const viewDelta =
        (right.article.viewCount ?? 0) - (left.article.viewCount ?? 0);
      if (viewDelta !== 0) {
        return viewDelta;
      }

      if (left.article.slug < right.article.slug) {
        return -1;
      }

      if (left.article.slug > right.article.slug) {
        return 1;
      }

      return 0;
    })
    .slice(0, limit)
    .map((entry) => entry.article);
}

function scoreArticle(
  article: RecommendableArticle,
  category: string | undefined,
  seedTags: ReadonlySet<string>,
): number {
  let score = 0;

  if (category && article.categorySlug === category) {
    score += 200;
  }

  if (article.featured) {
    score += 100;
  }

  if (seedTags.size > 0) {
    for (const tag of article.tags ?? []) {
      if (seedTags.has(tag)) {
        score += 10;
      }
    }
  }

  return score;
}
