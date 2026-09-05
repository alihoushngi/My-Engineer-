import Link from "next/link";
import { storePaths } from "@/config/navigation.config/navigation.config";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { userRegisterHref } from "@/lib/auth/safe-user-next/safe-user-next";

type UserLoginRegisterCrossLinkProps = {
  nextPath?: string;
};

export function UserLoginRegisterCrossLink({
  nextPath,
}: UserLoginRegisterCrossLinkProps) {
  return (
    <div className="space-y-2 text-center">
      <p className="type-body-sm text-muted-foreground">
        {userAuthCopy.registerPrefix}{" "}
        <Link
          href={userRegisterHref(nextPath)}
          className="font-medium text-primary underline-offset-4 hover:underline"
        >
          {userAuthCopy.registerAction}
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
