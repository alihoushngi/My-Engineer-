import { EngineerServiceAreasPage } from "@/components/store/engineer/engineerServiceAreasPage/engineerServiceAreasPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerLocationCatalog } from "@/services/engineer-service/engineer-service";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.serviceAreas);

export default async function EngineerServiceAreasRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const catalog = await getEngineerLocationCatalog();

  return (
    <EngineerServiceAreasPage
      workspace={workspace}
      provinces={catalog.provinces}
      cities={catalog.cities}
    />
  );
}
