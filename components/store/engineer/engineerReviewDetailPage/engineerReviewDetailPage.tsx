import Link from "next/link";
import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerReviewDetailPageProps = {
  review: EngineerReview;
};

export function EngineerReviewDetailPage({
  review,
}: EngineerReviewDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.reviewDetail}
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          {
            label: engineerPageTitles.reviews,
            href: engineerPanelPaths.reviews,
          },
          { label: engineerPageTitles.reviewDetail },
        ]}
        actions={
          <Button asChild variant="outline">
            <Link href={engineerPanelPaths.reviews}>
              {engineerPanelCopy.backToReviews}
            </Link>
          </Button>
        }
      />
      <article className="space-y-5 rounded-lg border border-border bg-surface p-(--space-card)">
        <div className="space-y-2">
          {review.authorName ? (
            <h2 className="type-h3 text-foreground">{review.authorName}</h2>
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
        {review.relatedServiceLabel ? (
          <p className="type-body-sm text-muted-foreground">
            {review.relatedServiceLabel}
          </p>
        ) : null}
        <p className="type-body leading-loose text-foreground">{review.text}</p>
        {review.replyText ? (
          <div className="rounded-lg bg-surface-muted p-4">
            <p className="mb-1 type-caption text-muted-foreground">
              {expertProfileCopy.reviewReplyLabel}
            </p>
            <p className="type-body-sm text-foreground">{review.replyText}</p>
          </div>
        ) : null}
      </article>
    </div>
  );
}
