import { Badge } from "@/components/ui/badge/badge";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { ExpertStarRating } from "@/components/store/expert/expertStarRating/expertStarRating";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { type ExpertReview } from "@/types/store/review.types";

type ExpertReviewCardProps = {
  review: ExpertReview;
};

export function ExpertReviewCard({ review }: ExpertReviewCardProps) {
  return (
    <article className="space-y-3 border-b border-border pb-6 last:border-b-0 last:pb-0">
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {review.authorName ? (
          <h3 className="type-body font-medium text-foreground">
            {review.authorName}
          </h3>
        ) : null}
        {review.authorRole ? (
          <p className="type-caption text-muted-foreground">
            {review.authorRole}
          </p>
        ) : null}
        {review.dateLabel ? (
          <p className="type-caption text-muted-foreground">
            {review.dateLabel}
          </p>
        ) : null}
      </header>
      {typeof review.rating === "number" ? (
        <div className="flex flex-wrap items-center gap-3">
          <ExpertStarRating
            rating={review.rating}
            label={`${expertProfileCopy.ratingLabel} ${review.rating}`}
          />
          <ExpertRating rating={review.rating} />
        </div>
      ) : null}
      <p className="type-body leading-loose text-foreground">{review.text}</p>
      {review.highlights && review.highlights.length > 0 ? (
        <ul className="flex flex-wrap gap-2">
          {review.highlights.map((item) => (
            <li key={`${item.kind}-${item.label}`}>
              <Badge variant={item.kind === "positive" ? "success" : "danger"}>
                {item.label}
              </Badge>
            </li>
          ))}
        </ul>
      ) : null}
      {review.replyText ? (
        <div className="rounded-lg bg-surface-muted p-4">
          <p className="mb-1 type-caption text-muted-foreground">
            {expertProfileCopy.reviewReplyLabel}
          </p>
          <p className="type-body-sm text-foreground">{review.replyText}</p>
        </div>
      ) : null}
    </article>
  );
}
