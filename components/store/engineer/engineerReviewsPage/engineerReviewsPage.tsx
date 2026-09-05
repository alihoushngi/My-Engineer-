import { EngineerPageHeader } from "@/components/store/engineer/engineerPageHeader/engineerPageHeader";
import { EngineerReviewRow } from "@/components/store/engineer/engineerReviewRow/engineerReviewRow";
import { Empty } from "@/components/ui/empty/empty";
import {
  engineerPageTitles,
  engineerPanelCopy,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
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
        breadcrumbs={[
          {
            label: engineerPageTitles.dashboard,
            href: engineerPanelPaths.dashboard,
          },
          { label: engineerPageTitles.reviews },
        ]}
      />
      {workspace.reviews.length === 0 ? (
        <Empty title={engineerPanelCopy.emptyReviews} />
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border bg-surface px-(--space-card)">
          {workspace.reviews.map((review) => (
            <li key={review.id}>
              <EngineerReviewRow review={review} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
