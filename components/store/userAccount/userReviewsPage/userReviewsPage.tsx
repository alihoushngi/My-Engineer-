import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { UserReviewRow } from "@/components/store/userAccount/userReviewRow/userReviewRow";
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
              <li key={review.id}>
                <UserReviewRow review={review} />
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
