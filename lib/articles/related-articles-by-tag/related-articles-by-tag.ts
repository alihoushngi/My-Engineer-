export type TaggableArticle = {
  slug: string;
  categorySlug?: string;
  tags?: readonly string[];
};

export function relatedArticlesByTag<T extends TaggableArticle>(
  articles: readonly T[],
  current: T,
  limit = 3,
): T[] {
  const safeLimit = Math.max(0, limit);
  const currentTags = new Set(current.tags ?? []);

  return articles
    .filter((article) => article.slug !== current.slug)
    .map((article) => {
      const overlap = (article.tags ?? []).filter((tag) =>
        currentTags.has(tag),
      ).length;
      const sameCategory = Boolean(
        current.categorySlug && article.categorySlug === current.categorySlug,
      );

      return { article, overlap, sameCategory };
    })
    .filter((entry) => entry.overlap > 0 || entry.sameCategory)
    .sort((left, right) => {
      if (right.overlap !== left.overlap) {
        return right.overlap - left.overlap;
      }

      if (Number(right.sameCategory) !== Number(left.sameCategory)) {
        return Number(right.sameCategory) - Number(left.sameCategory);
      }

      if (left.article.slug < right.article.slug) {
        return -1;
      }

      if (left.article.slug > right.article.slug) {
        return 1;
      }

      return 0;
    })
    .slice(0, safeLimit)
    .map((entry) => entry.article);
}
