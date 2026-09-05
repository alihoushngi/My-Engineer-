import Link from "next/link";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { Empty } from "@/components/ui/empty/empty";
import { Pagination } from "@/components/common/pagination/pagination";
import {
  userAccountCopy,
  userAccountPageTitles,
} from "@/config/user-account.config/user-account.config";
import { type PaginatedItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type UserReviewItem } from "@/types/store/user-account.types";

type UserReviewsPageProps = {
  reviews: readonly UserReviewItem[];
  pagination: PaginatedItems<UserReviewItem>;
  pathname: string;
};

export function UserReviewsPage({
  reviews,
  pagination,
  pathname,
}: UserReviewsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.reviews}
        description={userAccountCopy.reviewsDescription}
      />
      {pagination.total === 0 ? (
        <Empty title={userAccountCopy.emptyReviews} />
      ) : (
        <>
          <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
            {reviews.map((review) => (
              <li key={review.id} className="py-4">
                <article className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Link
                      href={review.expertHref}
                      className="type-body font-medium text-foreground outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {review.expertName}
                    </Link>
                    {review.dateLabel ? (
                      <p className="type-caption text-muted-foreground">
                        {review.dateLabel}
                      </p>
                    ) : null}
                  </div>
                  {typeof review.rating === "number" ? (
                    <ExpertRating rating={review.rating} />
                  ) : null}
                  <p className="type-body-sm leading-relaxed text-muted-foreground">
                    {review.text}
                  </p>
                </article>
              </li>
            ))}
          </ul>
          <Pagination
            page={pagination.page}
            pageCount={pagination.pageCount}
            ariaLabel={userAccountCopy.paginationLabel}
            pathname={pathname}
          />
        </>
      )}
    </div>
  );
}
