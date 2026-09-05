import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { AccountPanelShell } from "@/components/layout/accountPanelShell/accountPanelShell";
import { UserUnauthorized } from "@/components/store/userAccount/userUnauthorized/userUnauthorized";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import {
  userAuthCopy,
  userAuthPaths,
} from "@/config/user-auth.config/user-auth.config";
import { userAccountCopy } from "@/config/user-account.config/user-account.config";
import { userAccountMetadata } from "@/lib/auth/user-account-metadata/user-account-metadata";
import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";
import { toUserShellData } from "@/lib/user-account/build-user-workspace/build-user-workspace";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";
import { getUserWorkspace } from "@/services/user-account-service/user-account-service";

export const metadata = userAccountMetadata(userAccountCopy.workspaceName);

type AccountLayoutProps = {
  children: ReactNode;
};

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const access = await getUserAccess();

  if (access.kind === "unauthenticated" && isMockUserAuthEnabled()) {
    redirect(userLoginHref(userAuthPaths.account));
  }

  if (access.kind !== "authenticated") {
    return (
      <UserUnauthorized access={access} nextPath={userAuthPaths.account} />
    );
  }

  const workspace = await getUserWorkspace();

  if (!workspace) {
    return (
      <UserUnauthorized
        access={{ kind: "error", message: userAuthCopy.errorDescription }}
        nextPath={userAuthPaths.account}
      />
    );
  }

  return (
    <AccountPanelShell shell={toUserShellData(workspace)}>
      {children}
    </AccountPanelShell>
  );
}
