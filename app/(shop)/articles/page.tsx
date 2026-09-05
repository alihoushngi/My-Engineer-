import { type Metadata } from "next";
import { ArticlesPage } from "@/components/store/article/articlesPage/articlesPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import {
  ALL_ARTICLE_CATEGORY,
  filterArticlesByCategory,
  parseArticleCategoryParam,
} from "@/lib/articles/article-query/article-query";
import { recommendArticles } from "@/lib/articles/recommend-articles/recommend-articles";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  listArticleCategories,
  listArticles,
} from "@/services/article-service/article-service";

export const metadata: Metadata = {
  title: articlesCopy.hubTitle,
  description: articlesCopy.metadataDescription,
  alternates: {
    canonical: storePaths.articles,
  },
};

type ArticlesRouteProps = {
  searchParams: Promise<{
    page?: string | string[];
    category?: string | string[];
  }>;
};

export default async function ArticlesRoutePage({
  searchParams,
}: ArticlesRouteProps) {
  const params = await searchParams;
  const [articles, categories] = await Promise.all([
    listArticles(),
    listArticleCategories(),
  ]);
  const categorySlugs = categories.map((category) => category.slug);
  const activeCategory = parseArticleCategoryParam(
    params.category,
    categorySlugs,
  );
  const filtered = filterArticlesByCategory(articles, activeCategory);
  const pagination = paginateItems(filtered, parsePageParam(params.page));
  const recommended = recommendArticles(articles, {
    excludeSlugs: pagination.items.map((article) => article.slug),
    categorySlug: activeCategory,
    seedTags: pagination.items.flatMap((article) => article.tags ?? []),
  });

  return (
    <ArticlesPage
      articles={pagination.items}
      categories={categories}
      activeCategory={activeCategory}
      recommended={recommended}
      pagination={pagination}
      pathname={storePaths.articles}
      query={
        activeCategory === ALL_ARTICLE_CATEGORY
          ? undefined
          : `category=${activeCategory}`
      }
    />
  );
}
