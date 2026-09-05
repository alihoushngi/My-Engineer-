import { EngineerRequestsPage } from "@/components/store/engineer/engineerRequestsPage/engineerRequestsPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata(engineerPageTitles.requests);

export default async function EngineerRequestsRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerRequestsPage requests={workspace.requests} />;
}
