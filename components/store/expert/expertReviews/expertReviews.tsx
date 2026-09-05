"use client";

import { useState } from "react";
import { Pagination } from "@/components/common/pagination/pagination";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertReviewCard } from "@/components/store/expert/expertReviewCard/expertReviewCard";
import { ExpertStarRating } from "@/components/store/expert/expertStarRating/expertStarRating";
import { ReviewSubmitDialog } from "@/components/store/reviews/reviewSubmitDialog/reviewSubmitDialog";
import { Empty } from "@/components/ui/empty/empty";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { type ExpertReview } from "@/types/store/review.types";

type ExpertReviewsProps = {
  expertName: string;
  reviews?: readonly ExpertReview[];
  rating?: number;
  reviewCount?: number;
  eligibleRequestId?: string;
};

export function ExpertReviews({
  expertName,
  reviews,
  rating,
  reviewCount,
  eligibleRequestId,
}: ExpertReviewsProps) {
  const [page, setPage] = useState(1);
  const items = reviews ?? [];
  const count = reviewCount ?? (items.length > 0 ? items.length : undefined);
  const pagination = paginateItems(items, page);

  return (
    <section
      aria-labelledby="expert-reviews-heading"
      className="py-8 first:pt-0"
    >
      <div className="max-w-3xl space-y-8">
        <div className="space-y-4">
          <SectionHeader
            titleId="expert-reviews-heading"
            title={`${expertProfileCopy.reviewsTitle} ${expertName}`}
          />
          {typeof rating === "number" ? (
            <div className="flex flex-wrap items-center gap-3">
              <ExpertStarRating
                rating={rating}
                label={`${expertProfileCopy.ratingLabel} ${formatFaNumber(rating)}`}
              />
              <ExpertRating rating={rating} reviewCount={count} />
            </div>
          ) : count !== undefined ? (
            <p className="type-body-sm text-muted-foreground">
              {formatFaNumber(count)} {expertProfileCopy.reviewCountNoun}
            </p>
          ) : null}
          <p className="type-body-sm leading-loose text-muted-foreground">
            {expertProfileCopy.reviewsIntro}
          </p>
          {eligibleRequestId ? (
            <ReviewSubmitDialog requestId={eligibleRequestId} />
          ) : null}
        </div>
        {items.length === 0 ? (
          <Empty title={expertProfileCopy.reviewsEmpty} />
        ) : (
          <>
            <ul className="space-y-6">
              {pagination.items.map((review) => (
                <li key={review.id}>
                  <ExpertReviewCard review={review} />
                </li>
              ))}
            </ul>
            <Pagination
              page={pagination.page}
              pageCount={pagination.pageCount}
              ariaLabel={expertProfileCopy.reviewPaginationLabel}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </section>
  );
}
