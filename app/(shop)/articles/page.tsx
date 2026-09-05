import { type Metadata } from "next";
import { ArticlesPage } from "@/components/store/article/articlesPage/articlesPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import {
  buildPageHref,
  parsePageParam,
} from "@/lib/pagination/page-param/page-param";
import { listArticles } from "@/services/article-service/article-service";

export const metadata: Metadata = {
  title: articlesCopy.hubTitle,
  description: articlesCopy.metadataDescription,
  alternates: {
    canonical: storePaths.articles,
  },
};

type ArticlesRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function ArticlesRoutePage({
  searchParams,
}: ArticlesRouteProps) {
  const articles = await listArticles();
  const pagination = paginateItems(
    articles,
    parsePageParam((await searchParams).page),
  );

  return (
    <ArticlesPage
      articles={pagination.items}
      pagination={pagination}
      pageHref={(page) => buildPageHref(storePaths.articles, page)}
    />
  );
}
