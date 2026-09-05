import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { ExpertReviews } from "@/components/store/expert/expertReviews/expertReviews";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

type EngineerReviewsPageProps = {
  workspace: EngineerWorkspace;
};

export function EngineerReviewsPage({ workspace }: EngineerReviewsPageProps) {
  return (
    <div className="flex flex-col gap-6">
      <EngineerPageHeader
        title={engineerPageTitles.reviews}
        description="نظرهای دریافتی روی پروفایل عمومی. پاسخ متخصص در محصول فعلی پشتیبانی نمی‌شود."
      />
      <div className="rounded-lg border border-border bg-surface px-(--space-card)">
        <ExpertReviews
          reviews={workspace.reviews}
          rating={
            workspace.reviews.find((item) => typeof item.rating === "number")
              ?.rating
          }
          reviewCount={workspace.reviews.length}
        />
      </div>
    </div>
  );
}
