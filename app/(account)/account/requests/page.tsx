import { UserRequestsPage } from "@/components/store/userAccount/userRequestsPage/userRequestsPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.requests);

export default async function AccountRequestsRoute() {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  return <UserRequestsPage requests={workspace.requests} />;
}
