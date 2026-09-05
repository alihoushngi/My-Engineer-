import Link from "next/link";
import { NewspaperIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { ArticleCard } from "@/components/store/article/articleCard/articleCard";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { articlesCopy } from "@/config/articles.config/articles.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import {
  type ArticleCardData,
  type ArticleCategory,
} from "@/types/store/article.types";

type ArticleCategoryPageProps = {
  category: ArticleCategory;
  articles: readonly ArticleCardData[];
  pagination: PaginatedItems<ArticleCardData>;
  pageHref: (page: number) => string;
};

export function ArticleCategoryPage({
  category,
  articles,
  pagination,
  pageHref,
}: ArticleCategoryPageProps) {
  return (
    <div className="container-app flex flex-col gap-10 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: articlesCopy.hubBreadcrumb, href: storePaths.articles },
          { label: category.title },
        ]}
      />
      <ContentPageHeader
        title={category.title}
        description={category.description}
      />
      {pagination.total > 0 ? (
        <>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} />
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={articlesCopy.paginationLabel}
            buildHref={pageHref}
          />
        </>
      ) : (
        <Empty
          icon={<NewspaperIcon aria-hidden="true" />}
          title={articlesCopy.emptyCategoryTitle}
          description={articlesCopy.emptyCategoryDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.articles}>{articlesCopy.browseCta}</Link>
            </Button>
          }
        />
      )}
    </div>
  );
}
