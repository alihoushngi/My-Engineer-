import Link from "next/link";
import { AccountPageHeader } from "@/components/store/userAccount/accountPageHeader/accountPageHeader";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import { Button } from "@/components/ui/button/button";
import { expertProfileCopy } from "@/config/experts.config/experts.config";
import { reviewsCopy } from "@/config/reviews.config/reviews.config";
import {
  userAccountCopy,
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { type UserReviewItem } from "@/types/store/user-account.types";

type UserReviewDetailPageProps = {
  review: UserReviewItem;
};

export function UserReviewDetailPage({ review }: UserReviewDetailPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <AccountPageHeader
        title={userAccountPageTitles.reviewDetail}
        description={reviewsCopy.detailDescription}
      />
      <article className="space-y-5 rounded-lg border border-border bg-surface p-(--space-card)">
        <div className="space-y-2">
          <h2 className="type-h3 text-foreground">{review.expertName}</h2>
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
            {reviewsCopy.relatedService}: {review.relatedServiceLabel}
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
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link href={review.expertHref}>
              {userAccountCopy.openPublicProfile}
            </Link>
          </Button>
          {review.relatedRequestId ? (
            <Button asChild variant="outline">
              <Link
                href={`${userAccountPaths.requests}/${review.relatedRequestId}`}
              >
                {reviewsCopy.relatedRequest}
              </Link>
            </Button>
          ) : null}
          <Button asChild>
            <Link href={userAccountPaths.reviews}>
              {userAccountPageTitles.reviews}
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}
