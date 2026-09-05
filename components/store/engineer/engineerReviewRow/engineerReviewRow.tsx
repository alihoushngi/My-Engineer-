import Link from "next/link";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { engineerPanelPaths } from "@/config/engineer-panel.config/engineer-panel.config";
import { excerptReviewText } from "@/lib/engineer/review-excerpt/review-excerpt";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerReviewRowProps = {
  review: EngineerReview;
};

export function EngineerReviewRow({ review }: EngineerReviewRowProps) {
  return (
    <Link
      href={`${engineerPanelPaths.reviews}/${review.id}`}
      className="flex min-h-14 flex-col gap-2 py-4 outline-none focus-visible:ring-2 focus-visible:ring-ring sm:flex-row sm:items-start sm:justify-between"
    >
      <div className="min-w-0 space-y-2">
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
      </div>
    </Link>
  );
}
