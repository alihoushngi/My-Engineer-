import { EngineerMessagesPage } from "@/components/store/engineer/engineerMessagesPage/engineerMessagesPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-service";

export const metadata = engineerPageMetadata(engineerPageTitles.messages);

export default async function EngineerMessagesRoute() {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  return <EngineerMessagesPage conversations={workspace.conversations} />;
}
