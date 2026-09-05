import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/store/article/articleDetailPage/articleDetailPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { relatedArticlesByTag } from "@/lib/articles/related-articles-by-tag/related-articles-by-tag";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { listArticleComments } from "@/services/article-comment-service/article-comment-service";
import {
  getArticleBySlug,
  listArticleCategories,
  listArticles,
} from "@/services/article-service/article-service";

type ArticleDetailRouteProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ArticleDetailRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return notFoundMetadata;
  }

  return {
    title: `${article.title} | ${articlesCopy.hubTitle}`,
    description: article.excerpt ?? articlesCopy.metadataDescription,
    alternates: {
      canonical: article.href,
    },
  };
}

export default async function ArticleDetailRoutePage({
  params,
}: ArticleDetailRouteProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const [categories, catalog, comments] = await Promise.all([
    listArticleCategories(),
    listArticles(),
    listArticleComments(article.id),
  ]);

  return (
    <ArticleDetailPage
      article={article}
      categories={categories}
      related={relatedArticlesByTag(catalog, article)}
      comments={comments}
    />
  );
}
