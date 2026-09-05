import { EngineerReviewsPage } from "@/components/store/engineer/engineerReviewsPage/engineerReviewsPage";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.reviews);

type EngineerReviewsRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function EngineerReviewsRoute({
  searchParams,
}: EngineerReviewsRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.reviews,
    parsePageParam((await searchParams).page),
  );

  return (
    <EngineerReviewsPage
      reviews={pagination.items}
      pagination={pagination}
      pathname={engineerPanelPaths.reviews}
    />
  );
}
