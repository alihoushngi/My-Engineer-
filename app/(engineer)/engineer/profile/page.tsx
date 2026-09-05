import { EngineerProfileManagePage } from "@/components/store/engineer/engineerProfileManagePage/engineerProfileManagePage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata(engineerPageTitles.profile);

export default async function EngineerProfileRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerProfileManagePage workspace={workspace} />;
}
