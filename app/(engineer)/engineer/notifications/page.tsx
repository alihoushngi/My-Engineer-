import { EngineerNotificationsPage } from "@/components/store/engineer/engineerNotificationsPage/engineerNotificationsPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata(engineerPageTitles.notifications);

export default async function EngineerNotificationsRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerNotificationsPage notifications={workspace.notifications} />;
}
