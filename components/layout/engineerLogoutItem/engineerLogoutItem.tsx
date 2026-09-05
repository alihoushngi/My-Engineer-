"use client";

import { DropdownMenuItem } from "@/components/ui/dropdownMenu/dropdownMenu";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useEngineerLogout } from "@/hooks/use-engineer-logout/use-engineer-logout";

export function EngineerLogoutItem() {
  const { logout, error, isPending } = useEngineerLogout();

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
        {engineerPanelCopy.logoutLabel}
      </DropdownMenuItem>
      {error ? (
        <p className="px-2 pb-2 type-caption text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerActionError";
