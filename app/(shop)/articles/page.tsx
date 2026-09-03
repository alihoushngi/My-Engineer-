import { type Metadata } from "next";
import { ArticlesPage } from "@/components/store/article/articlesPage/articlesPage";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { listArticles } from "@/services/article-service/article-service";

export const metadata: Metadata = {
  title: `${articlesCopy.hubTitle} | ${siteConfig.name}`,
  description: articlesCopy.metadataDescription,
  alternates: {
    canonical: storePaths.articles,
  },
};

export default async function ArticlesRoutePage() {
  const articles = await listArticles();

  return <ArticlesPage articles={articles} />;
}
