import { notFound } from "next/navigation";
import { EngineerReviewDetailPage } from "@/components/store/engineer/engineerReviewDetailPage/engineerReviewDetailPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import {
  getEngineerReview,
  getEngineerWorkspace,
} from "@/services/engineer-service/engineer-access-service";

type EngineerReviewDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = engineerPageMetadata(engineerPageTitles.reviewDetail);
export const dynamic = "force-dynamic";

export default async function EngineerReviewDetailRoute({
  params,
}: EngineerReviewDetailRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const { id } = await params;
  const review = await getEngineerReview(id);

  if (!review) {
    notFound();
  }

  return <EngineerReviewDetailPage review={review} />;
}
