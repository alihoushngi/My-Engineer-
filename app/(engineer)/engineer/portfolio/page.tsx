import { EngineerPortfolioPage } from "@/components/store/engineer/engineerPortfolioPage/engineerPortfolioPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.portfolio);

export default async function EngineerPortfolioRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerPortfolioPage items={workspace.portfolio} />;
}
