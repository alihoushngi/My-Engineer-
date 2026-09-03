import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleCategoryPage } from "@/components/store/article/articleCategoryPage/articleCategoryPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import {
  getArticleCategory,
  listArticlesByCategory,
} from "@/services/article-service/article-service";

type ArticleCategoryRouteProps = {
  params: Promise<{ slug: string }>;
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
}: ArticleCategoryRouteProps) {
  const { slug } = await params;
  const category = await getArticleCategory(slug);

  if (!category) {
    notFound();
  }

  const articles = await listArticlesByCategory(slug);

  return <ArticleCategoryPage category={category} articles={articles} />;
}
