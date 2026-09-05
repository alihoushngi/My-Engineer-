import { notFound } from "next/navigation";
import { EngineerRequestDetailPage } from "@/components/store/engineer/engineerRequestDetailPage/engineerRequestDetailPage";
import { engineerPageTitles } from "@/config/engineer-panel.config/engineer-panel.config";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import {
  getEngineerRequest,
  getEngineerWorkspace,
} from "@/services/engineer-service/engineer-access-service";

type EngineerRequestDetailRouteProps = {
  params: Promise<{ id: string }>;
};

export const metadata = engineerPageMetadata(engineerPageTitles.requestDetail);
export const dynamic = "force-dynamic";

export default async function EngineerRequestDetailRoute({
  params,
}: EngineerRequestDetailRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const { id } = await params;
  const request = await getEngineerRequest(id);

  if (!request) {
    notFound();
  }

  return <EngineerRequestDetailPage request={request} />;
}
