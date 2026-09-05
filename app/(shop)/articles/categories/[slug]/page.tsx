import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCategoryPage } from "@/components/store/article/articleCategoryPage/articleCategoryPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { recommendArticles } from "@/lib/articles/recommend-articles/recommend-articles";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import {
  getArticleCategory,
  listArticles,
  listArticlesByCategory,
} from "@/services/article-service/article-service";

type ArticleCategoryRouteProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
};

export async function generateMetadata({
  params,
}: ArticleCategoryRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getArticleCategory(slug);

  if (!category) {
    return notFoundMetadata;
  }

  return {
    title: `${category.title} | ${articlesCopy.hubTitle}`,
    description: category.description ?? articlesCopy.metadataDescription,
    alternates: {
      canonical: category.href,
    },
  };
}

export default async function ArticleCategoryRoutePage({
  params,
  searchParams,
}: ArticleCategoryRouteProps) {
  const { slug } = await params;
  const category = await getArticleCategory(slug);

  if (!category) {
    notFound();
  }

  const [articles, catalog] = await Promise.all([
    listArticlesByCategory(slug),
    listArticles(),
  ]);
  const pagination = paginateItems(
    articles,
    parsePageParam((await searchParams).page),
  );
  const recommended = recommendArticles(catalog, {
    excludeSlugs: pagination.items.map((article) => article.slug),
    categorySlug: slug,
    seedTags: pagination.items.flatMap((article) => article.tags ?? []),
  });

  return (
    <ArticleCategoryPage
      category={category}
      articles={pagination.items}
      recommended={recommended}
      pagination={pagination}
      pathname={category.href}
    />
  );
}
