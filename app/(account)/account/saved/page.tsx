import { UserSavedPage } from "@/components/store/userAccount/userSavedPage/userSavedPage";
import { userAccountPageTitles } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountPageTitles.saved);

export default async function AccountSavedRoute() {
  const workspace = await getUserWorkspace();

  if (!workspace) {
    return null;
  }

  return (
    <UserSavedPage
      experts={workspace.savedExperts}
      conversations={workspace.conversations}
    />
  );
}
