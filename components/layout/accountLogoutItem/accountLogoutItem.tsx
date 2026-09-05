"use client";

import { DropdownMenuItem } from "@/components/ui/dropdownMenu/dropdownMenu";
import { userAccountCopy } from "@/config/user-account.config/user-account.config";
import { useUserLogout } from "@/hooks/use-user-logout/use-user-logout";

export function AccountLogoutItem() {
  const { logout, error, isPending } = useUserLogout();

  return (
    <div className="px-1">
      <DropdownMenuItem
        variant="danger"
        disabled={isPending}
        onSelect={(event) => {
          event.preventDefault();
          void logout();
        }}
      >
        {userAccountCopy.logoutLabel}
      </DropdownMenuItem>
      {error ? (
        <p className="px-2 pb-2 type-caption text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
