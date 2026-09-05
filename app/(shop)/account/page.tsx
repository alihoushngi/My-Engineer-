import { UserAccountPage } from "@/components/store/userAccount/userAccountPage/userAccountPage";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";

export const metadata = userAccountMetadata(userAuthCopy.accountTitle);

export default async function AccountPage() {
  const access = await getUserAccess();

  if (access.kind !== "authenticated") {
    return null;
  }

  return <UserAccountPage session={access.session} />;
}
