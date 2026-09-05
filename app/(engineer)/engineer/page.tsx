import { EngineerDashboard } from "@/components/store/engineer/engineerDashboard/engineerDashboard";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata(engineerPageTitles.dashboard);

export default async function EngineerDashboardRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerDashboard workspace={workspace} />;
}
