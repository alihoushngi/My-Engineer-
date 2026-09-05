export const ALL_ARTICLE_CATEGORY = "all";

export function parseArticleCategoryParam(
  value: string | string[] | undefined | null,
  categorySlugs: readonly string[],
): string {
  const raw = Array.isArray(value) ? value[0] : value;
  const slug = raw?.trim() ?? "";

  if (slug === "" || slug === ALL_ARTICLE_CATEGORY) {
    return ALL_ARTICLE_CATEGORY;
  }

  return categorySlugs.includes(slug) ? slug : ALL_ARTICLE_CATEGORY;
}

export function filterArticlesByCategory<T extends { categorySlug?: string }>(
  articles: readonly T[],
  categorySlug: string,
): readonly T[] {
  if (categorySlug === ALL_ARTICLE_CATEGORY) {
    return articles;
  }

  return articles.filter((article) => article.categorySlug === categorySlug);
}

export function buildArticleHubHref(
  pathname: string,
  categorySlug: string,
  page = 1,
): string {
  const params = new URLSearchParams();

  if (categorySlug !== ALL_ARTICLE_CATEGORY) {
    params.set("category", categorySlug);
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const serialized = params.toString();
  return serialized === "" ? pathname : `${pathname}?${serialized}`;
}
