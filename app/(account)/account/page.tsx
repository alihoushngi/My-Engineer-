import { UserDashboard } from "@/components/store/userAccount/userDashboard/userDashboard";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.dashboard);

export default async function AccountDashboardRoute() {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  return <UserDashboard workspace={workspace} />;
}
