import Link from "next/link";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { userLoginHref } from "@/lib/auth/safe-user-next/safe-user-next";

type UserRegisterLoginCrossLinkProps = {
  nextPath?: string;
};

export function UserRegisterLoginCrossLink({
  nextPath,
}: UserRegisterLoginCrossLinkProps) {
  return (
    <div className="space-y-2 text-center">
      <p className="type-body-sm text-muted-foreground">
        {userAuthCopy.loginPrefix}{" "}
        <Link
          href={userLoginHref(nextPath)}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {userAuthCopy.loginAction}
        </Link>
      </p>
      <p className="type-caption text-muted-foreground">
        {userAuthCopy.engineerEntryPrefix}{" "}
        <Link
          href={storePaths.engineerLogin}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {userAuthCopy.engineerLoginAction}
        </Link>
      </p>
    </div>
  );
}
