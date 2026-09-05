"use client";

import { Button } from "@/components/ui/button/button";
import { userAuthCopy } from "@/config/user-auth.config/user-auth.config";
import { useUserLogout } from "@/hooks/use-user-logout/use-user-logout";

export function UserLogoutButton() {
  const { logout, error, isPending } = useUserLogout();

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant="outline"
        loading={isPending}
        onClick={() => {
          void logout();
        }}
      >
        {userAuthCopy.logoutLabel}
      </Button>
      {error ? (
        <p className="type-caption text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
