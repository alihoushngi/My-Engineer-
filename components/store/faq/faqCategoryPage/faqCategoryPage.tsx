import Link from "next/link";
import { CircleHelpIcon } from "lucide-react";
import { ContentPageHeader } from "@/components/common/contentPageHeader/contentPageHeader";
import { Pagination } from "@/components/common/pagination/pagination";
import { StoreBreadcrumb } from "@/components/common/storeBreadcrumb/storeBreadcrumb";
import { FaqAccordion } from "@/components/store/faq/faqAccordion/faqAccordion";
import { FaqCategoryCard } from "@/components/store/faq/faqCategoryCard/faqCategoryCard";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { faqCopy } from "@/config/faq.config/faq.config";
import { siteConfig } from "@/config/site.config/site.config";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type FaqCategoryDetail, type FaqItem } from "@/types/store/faq.types";

type FaqCategoryPageProps = {
  category: FaqCategoryDetail;
  items: readonly FaqItem[];
  pagination: PaginatedItems<FaqItem>;
  pageHref: (page: number) => string;
};

export function FaqCategoryPage({
  category,
  items,
  pagination,
  pageHref,
}: FaqCategoryPageProps) {
  const related = category.relatedCategories ?? [];

  return (
    <div className="container-narrow flex flex-col gap-8 py-page">
      <StoreBreadcrumb
        items={[
          { label: "خانه", href: siteConfig.homeHref },
          { label: faqCopy.breadcrumb, href: storePaths.faq },
          { label: category.title },
        ]}
      />
      <ContentPageHeader
        title={category.title}
        description={category.description}
      />
      {pagination.total > 0 ? (
        <>
          <FaqAccordion items={items} />
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={faqCopy.paginationLabel}
            buildHref={pageHref}
          />
        </>
      ) : (
        <Empty
          icon={<CircleHelpIcon aria-hidden="true" />}
          title={faqCopy.emptyCategoryTitle}
          description={faqCopy.emptyCategoryDescription}
          action={
            <Button asChild variant="outline">
              <Link href={storePaths.faq}>{faqCopy.browseCta}</Link>
            </Button>
          }
        />
      )}
      {category.relatedServiceHref && category.relatedServiceLabel ? (
        <Button asChild className="max-w-full min-w-0 whitespace-normal">
          <Link href={category.relatedServiceHref}>
            {faqCopy.serviceCtaLabel}: {category.relatedServiceLabel}
          </Link>
        </Button>
      ) : null}
      {related.length > 0 ? (
        <section className="space-y-4" aria-labelledby="faq-related-heading">
          <h2 id="faq-related-heading" className="type-h4 text-foreground">
            {faqCopy.relatedCategoriesHeading}
          </h2>
          <ul className="grid grid-cols-1 gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <FaqCategoryCard category={item} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
