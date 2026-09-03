import Link from "next/link";
import { NewspaperIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type ArticleCardData } from "@/types/store/article.types";

type ArticlesPageProps = {
  articles: readonly ArticleCardData[];
};

export function ArticlesPage({ articles }: ArticlesPageProps) {
  return (
    <div className="container-app flex flex-col gap-8 py-8 sm:py-12">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: articlesCopy.hubBreadcrumb },
        ]}
      />
      <ContentPageHeader
        title={articlesCopy.hubTitle}
        description={articlesCopy.hubDescription}
      />
      {articles.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      ) : (
        <Empty
          icon={<NewspaperIcon aria-hidden="true" />}
          title={articlesCopy.emptyTitle}
          description={articlesCopy.emptyDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.home}>{articlesCopy.homeCta}</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
