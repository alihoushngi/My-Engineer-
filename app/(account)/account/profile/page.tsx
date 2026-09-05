import { UserProfilePage } from "@/components/store/userAccount/userProfilePage/userProfilePage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.profile);

export default async function AccountProfileRoute() {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  return <UserProfilePage account={workspace.account} />;
}
