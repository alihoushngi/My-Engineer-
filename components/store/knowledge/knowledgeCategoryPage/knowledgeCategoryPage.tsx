import Link from "next/link";
import { BookOpenIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { KnowledgeTipList } from "@/components/store/knowledge/knowledgeTipList/knowledgeTipList";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { knowledgeCopy } from "@/config/knowledge.config/knowledge.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import {
  type KnowledgeCategoryDetail,
  type KnowledgeTip,
} from "@/types/store/knowledge.types";

type KnowledgeCategoryPageProps = {
  category: KnowledgeCategoryDetail;
  tips: readonly KnowledgeTip[];
  pagination: PaginatedItems<KnowledgeTip>;
  pathname: string;
};

export function KnowledgeCategoryPage({
  category,
  tips,
  pagination,
  pathname,
}: KnowledgeCategoryPageProps) {
  return (
    <div className="container-narrow flex flex-col gap-8 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: knowledgeCopy.breadcrumb, href: storePaths.knowledge },
          { label: category.title },
        ]}
      />
      <ContentPageHeader
        title={category.title}
        description={category.description}
      />
      {pagination.total > 0 ? (
        <>
          <KnowledgeTipList tips={tips} />
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={knowledgeCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      ) : (
        <Empty
          icon={<BookOpenIcon aria-hidden="true" />}
          title={knowledgeCopy.emptyCategoryTitle}
          description={knowledgeCopy.emptyCategoryDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.knowledge}>{knowledgeCopy.browseCta}</Link>
            </Button>
          }
        />
      )}
      {category.relatedServiceHref && category.relatedServiceLabel ? (
        <Button
          asChild
          variant="outline"
          className="max-w-full min-w-0 whitespace-normal"
        >
          <Link href={category.relatedServiceHref}>
            {knowledgeCopy.serviceCtaLabel}: {category.relatedServiceLabel}
          </Link>
        </Button>
      ) : null}
    </div>
  );
}
