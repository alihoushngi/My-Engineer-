import { EngineerCredentialsPage } from "@/components/store/engineer/engineerCredentialsPage/engineerCredentialsPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.credentials);

export default async function EngineerCredentialsRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerCredentialsPage workspace={workspace} />;
}
