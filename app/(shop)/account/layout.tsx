import { type ReactNode } from "react";
import { redirect } from "next/navigation";
import { UserAuthGuard } from "@/components/store/userAccount/userAuthGuard/userAuthGuard";
import { isMockUserAuthEnabled } from "@/config/mock-auth.config/mock-auth.config";
import { userAuthPaths } from "@/config/user-auth.config/user-auth.config";
import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";
import { getUserAccess } from "@/services/user-auth-service/user-access-service";

type AccountLayoutProps = {
  children: ReactNode;
};

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const access = await getUserAccess();

  if (access.kind === "unauthenticated" && isMockUserAuthEnabled()) {
    redirect(userLoginHref(userAuthPaths.account));
  }

  return (
    <UserAuthGuard access={access} nextPath={userAuthPaths.account}>
      {children}
    </UserAuthGuard>
  );
}
