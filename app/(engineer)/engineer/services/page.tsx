import { EngineerServicesPage } from "@/components/store/engineer/engineerServicesPage/engineerServicesPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata(engineerPageTitles.services);

export default async function EngineerServicesRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerServicesPage workspace={workspace} />;
}
