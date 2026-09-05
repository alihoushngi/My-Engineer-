import { Pagination } from "@/components/common/pagination/pagination";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerReviewRow } from "@/components/store/engineer/engineerReviewRow/engineerReviewRow";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerReviewsPageProps = {
  reviews: readonly EngineerReview[];
  pagination: PaginatedItems<EngineerReview>;
  pageHref: (page: number) => string;
};

export function EngineerReviewsPage({
  reviews,
  pagination,
  pageHref,
}: EngineerReviewsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.reviews}
        description="نظرهای دریافتی روی پروفایل عمومی. پاسخ متخصص در محصول فعلی پشتیبانی نمی‌شود."
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          { label: engineerPageTitles.reviews },
        ]}
      />
      {pagination.total === 0 ? (
        <Empty title={engineerPanelCopy.emptyReviews} />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
            {reviews.map((review) => (
              <li key={review.id}>
                <EngineerReviewRow review={review} />
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={engineerPanelCopy.paginationLabel}
            buildHref={pageHref}
          />
        </>
      )}
    </div>
  );
}
