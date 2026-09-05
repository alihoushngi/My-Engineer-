import Link from "next/link";
import Image from "next/image";
import { ArrowLeftIcon } from "lucide-react";
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
import { type ArticleCardData } from "@/types/store/article.types";

type ArticlesPageProps = {
  articles: readonly ArticleCardData[];
  pagination: PaginatedItems<ArticleCardData>;
  pageHref: (page: number) => string;
};

export function ArticlesPage({
  articles,
  pagination,
  pageHref,
}: ArticlesPageProps) {
  const featured = pagination.page === 1 ? articles[0] : undefined;
  const list = featured ? articles.slice(1) : articles;

  return (
    <div className="container-app flex flex-col gap-10 py-page">
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
      {pagination.total > 0 ? (
        <>
          {featured ? (
            <Link
              href={featured.href}
              className="group grid overflow-hidden rounded-xl bg-primary-deep text-primary-deep-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring lg:grid-cols-[1.1fr_.9fr]"
            >
              <div className="relative min-h-52 lg:min-h-72">
                {featured.coverSrc ? (
                  <Image
                    src={featured.coverSrc}
                    alt={`تصویر مقاله ${featured.title}`}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="type-label text-primary">مقاله منتخب</p>
                <h2 className="mt-4 type-h1">{featured.title}</h2>
                <p className="mt-4 type-body text-primary-foreground/70">
                  {featured.excerpt}
                </p>
                <span className="mt-7 inline-flex items-center gap-2 type-button">
                  مطالعه مقاله{" "}
                  <ArrowLeftIcon
                    aria-hidden="true"
                    className="size-4 transition-transform group-hover:-translate-x-1 motion-reduce:transform-none"
                  />
                </span>
              </div>
            </Link>
          ) : null}
          {list.length > 0 ? (
            <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((article) => (
                <li key={article.slug}>
                  <ArticleCard article={article} />
                </li>
              ))}
            </ul>
          ) : null}
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
