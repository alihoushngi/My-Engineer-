import Link from "next/link";
import { Empty } from "@/components/ui/empty/empty";
import { Button } from "@/components/ui/button/button";
import { ExpertRating } from "@/components/store/expert/expertRating/expertRating";
import {
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerReview } from "@/types/store/engineer.types";

type EngineerLatestReviewsProps = {
  reviews: readonly EngineerReview[];
};

export function EngineerLatestReviews({ reviews }: EngineerLatestReviewsProps) {
  const latest = reviews[0];

  return (
    <section className="rounded-lg border border-border bg-surface p-(--space-card)">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="type-h4 text-foreground">
          {engineerPanelCopy.latestReviews}
        </h2>
        <Button asChild variant="link" size="sm">
          <Link href={engineerPanelPaths.reviews}>
            {engineerPanelCopy.viewAll}
          </Link>
        </Button>
      </div>
      {!latest ? (
        <Empty title={engineerPanelCopy.emptyReviews} className="py-8" />
      ) : (
        <div className="space-y-3">
          {typeof latest.rating === "number" ? (
            <ExpertRating rating={latest.rating} />
          ) : null}
          <p className="type-body text-foreground">{latest.text}</p>
          <p className="type-caption text-muted-foreground">
            {[latest.authorName, latest.dateLabel].filter(Boolean).join(" · ")}
          </p>
        </div>
      )}
    </section>
  );
}
