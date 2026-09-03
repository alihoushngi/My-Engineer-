import { SectionHeader } from "@/components/common/sectionHeader/sectionHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { Empty } from "@/components/ui/empty/empty";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertReview } from "@/types/store/review.types";
import { formatFaNumber } from "@/lib/format/format-fa-number/format-fa-number";

type ExpertReviewsProps = {
  reviews?: readonly ExpertReview[];
  rating?: number;
  reviewCount?: number;
};

export function ExpertReviews({
  reviews,
  rating,
  reviewCount,
}: ExpertReviewsProps) {
  const items = reviews ?? [];
  const count = reviewCount ?? (items.length > 0 ? items.length : undefined);

  return (
    <section
      aria-labelledby="expert-reviews-heading"
      className="container-app py-page"
    >
      <div className="max-w-3xl space-y-8">
        <div className="space-y-3">
          <SectionHeader
            titleId="expert-reviews-heading"
            title={expertProfileCopy.reviewsTitle}
          />
          {typeof rating === "number" ? (
            <ExpertRating rating={rating} reviewCount={count} />
          ) : count !== undefined ? (
            <p className="type-body-sm text-muted-foreground">
              {formatFaNumber(count)} {expertProfileCopy.reviewCountNoun}
            </p>
          ) : null}
        </div>
        {items.length === 0 ? (
          <Empty title={expertProfileCopy.reviewsEmpty} />
        ) : (
          <ul className="space-y-6">
            {items.map((review) => (
              <li
                key={review.id}
                className="space-y-3 border-b border-border pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  {review.authorName ? (
                    <p className="type-body font-medium text-foreground">
                      {review.authorName}
                    </p>
                  ) : null}
                  {review.dateLabel ? (
                    <p className="type-caption text-muted-foreground">
                      {review.dateLabel}
                    </p>
                  ) : null}
                </div>
                {typeof review.rating === "number" ? (
                  <ExpertRating rating={review.rating} />
                ) : null}
                <p className="type-body text-foreground">{review.text}</p>
                {review.replyText ? (
                  <div className="rounded-lg bg-surface-muted p-4">
                    <p className="mb-1 type-caption text-muted-foreground">
                      {expertProfileCopy.reviewReplyLabel}
                    </p>
                    <p className="type-body-sm text-foreground">
                      {review.replyText}
                    </p>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
