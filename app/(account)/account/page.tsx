import { UserDashboard } from "@/components/store/userAccount/userDashboard/userDashboard";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { toRequestExpertOptions } from "@/lib/marketplace/to-request-expert-option/to-request-expert-option";
import { listCatalogCities } from "@/services/catalog-service/catalog-service";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.dashboard);

export default async function AccountDashboardRoute() {
  const [workspace, cities] = await Promise.all([
    getUserWorkspace(),
    listCatalogCities(),
  ]);

  if (!workspace) {
    return null;
  }

  return (
    <UserDashboard
      workspace={workspace}
      cities={cities}
      experts={toRequestExpertOptions(workspace.savedExperts, cities)}
    />
  );
}
