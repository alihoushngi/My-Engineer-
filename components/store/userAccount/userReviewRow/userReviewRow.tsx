import Link from "next/link";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { excerptReviewText } from "@/lib/engineer/review-excerpt/review-excerpt";
import { type UserReviewItem } from "@/types/store/user-account.types";

type UserReviewRowProps = {
  review: UserReviewItem;
};

export function UserReviewRow({ review }: UserReviewRowProps) {
  return (
    <Link
      href={review.href}
      className="flex min-h-14 flex-col gap-2 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="type-body font-medium text-foreground">
          {review.expertName}
        </p>
        {review.dateLabel ? (
          <p className="type-caption text-muted-foreground">
            {review.dateLabel}
          </p>
        ) : null}
      </div>
      {review.relatedServiceLabel ? (
        <p className="type-caption text-muted-foreground">
          {review.relatedServiceLabel}
        </p>
      ) : null}
      {typeof review.rating === "number" ? (
        <ExpertRating rating={review.rating} />
      ) : null}
      <p className="line-clamp-2 type-body-sm text-muted-foreground">
        {excerptReviewText(review.text)}
      </p>
    </Link>
  );
}
