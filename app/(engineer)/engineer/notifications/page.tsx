import { EngineerNotificationsPage } from "@/components/store/engineer/engineerNotificationsPage/engineerNotificationsPage";
import {
  engineerPageTitles,
  engineerPanelPaths,
} from "@/config/engineer-panel.config/engineer-panel.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import {
  buildPageHref,
  parsePageParam,
} from "@/lib/pagination/page-param/page-param";
import { engineerPageMetadata } from "@/lib/engineer/private-panel-metadata/private-panel-metadata";
import { getEngineerWorkspace } from "@/services/engineer-service/engineer-access-service";

export const metadata = engineerPageMetadata(engineerPageTitles.notifications);

type EngineerNotificationsRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function EngineerNotificationsRoute({
  searchParams,
}: EngineerNotificationsRouteProps) {
  const workspace = await getEngineerWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.notifications,
    parsePageParam((await searchParams).page),
  );

  return (
    <EngineerNotificationsPage
      notifications={pagination.items}
      pagination={pagination}
      pageHref={(page) => buildPageHref(engineerPanelPaths.notifications, page)}
    />
  );
}
