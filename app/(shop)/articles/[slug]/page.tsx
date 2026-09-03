import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleDetailPage } from "@/components/store/article/articleDetailPage/articleDetailPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { notFoundMetadata } from "@/lib/seo/not-found-metadata/not-found-metadata";
import { getArticleBySlug } from "@/services/article-service/article-service";

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

  return <ArticleDetailPage article={article} />;
}
