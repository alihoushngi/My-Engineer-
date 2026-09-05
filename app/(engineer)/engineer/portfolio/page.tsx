import { EngineerPortfolioPage } from "@/components/store/engineer/engineerPortfolioPage/engineerPortfolioPage";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.portfolio);

type EngineerPortfolioRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function EngineerPortfolioRoute({
  searchParams,
}: EngineerPortfolioRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.portfolio,
    parsePageParam((await searchParams).page),
  );

  return (
    <EngineerPortfolioPage
      items={pagination.items}
      pagination={pagination}
      pathname={engineerPanelPaths.portfolio}
    />
  );
}
