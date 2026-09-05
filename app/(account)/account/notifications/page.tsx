import { UserNotificationsPage } from "@/components/store/userAccount/userNotificationsPage/userNotificationsPage";
import {
  userAccountPageTitles,
  userAccountPaths,
} from "@/config/user-account.config/user-account.config";
import { paginateItems } from "@/lib/pagination/paginate-items/paginate-items";
import { parsePageParam } from "@/lib/pagination/page-param/page-param";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(
  userAccountPageTitles.notifications,
);

type AccountNotificationsRouteProps = {
  searchParams: Promise<{ page?: string | string[] }>;
};

export default async function AccountNotificationsRoute({
  searchParams,
}: AccountNotificationsRouteProps) {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  const pagination = paginateItems(
    workspace.notifications,
    parsePageParam((await searchParams).page),
  );

  return (
    <UserNotificationsPage
      notifications={pagination.items}
      pagination={pagination}
      pathname={userAccountPaths.notifications}
    />
  );
}
