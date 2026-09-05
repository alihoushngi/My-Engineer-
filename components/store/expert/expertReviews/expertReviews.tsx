"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertLegacyFeature } from "@/components/store/expert/expertLegacyFeature/expertLegacyFeature";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertReviewCard } from "@/components/store/expert/expertReviewCard/expertReviewCard";
import { ExpertStarRating } from "@/components/store/expert/expertStarRating/expertStarRating";
import { Button } from "@/components/ui/button/button";
import { Empty } from "@/components/ui/empty/empty";
import {
  EXPERT_REVIEWS_PAGE_SIZE,
  expertProfileCopy,
} from "@/config/experts.config/experts.config";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";
import { paginateItems } from "@/lib/home/paginate-items/paginate-items";
import { type ExpertReview } from "@/types/store/review.types";

type ExpertReviewsProps = {
  expertName: string;
  reviews?: readonly ExpertReview[];
  rating?: number;
  reviewCount?: number;
};

export function ExpertReviews({
  expertName,
  reviews,
  rating,
  reviewCount,
}: ExpertReviewsProps) {
  const [page, setPage] = useState(1);
  const items = reviews ?? [];
  const count = reviewCount ?? (items.length > 0 ? items.length : undefined);
  const pagination = paginateItems(items, page, EXPERT_REVIEWS_PAGE_SIZE);

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
          <ExpertLegacyFeature
            label={expertProfileCopy.reviewSubmitLabel}
            title={expertProfileCopy.reviewSubmitUnavailableTitle}
            description={expertProfileCopy.reviewSubmitUnavailableDescription}
          />
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
            {pagination.hasPagination ? (
              <nav
                aria-label={expertProfileCopy.reviewPaginationLabel}
                className="flex flex-wrap items-center justify-center gap-2"
              >
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page <= 1}
                  onClick={() => {
                    setPage((current) => current - 1);
                  }}
                >
                  {expertProfileCopy.previousLabel}
                </Button>
                {Array.from(
                  { length: pagination.pageCount },
                  (_, index) => index + 1,
                ).map((item) => (
                  <Button
                    key={item}
                    variant={item === pagination.page ? "primary" : "outline"}
                    size="sm"
                    aria-current={item === pagination.page ? "page" : undefined}
                    onClick={() => {
                      setPage(item);
                    }}
                  >
                    {formatFaNumber(item)}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  disabled={pagination.page >= pagination.pageCount}
                  onClick={() => {
                    setPage((current) => current + 1);
                  }}
                >
                  {expertProfileCopy.nextLabel}
                </Button>
              </nav>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}
