"use client";

import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerActionError";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useEngineerLogout } from "@/hooks/use-engineer-logout/use-engineer-logout";

export function EngineerLogoutButton() {
  const { logout, error, isPending } = useEngineerLogout();

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        loading={isPending}
        onClick={() => {
          void logout();
        }}
      >
        {engineerPanelCopy.logoutLabel}
      </Button>
      <EngineerActionError message={error} onRetry={() => void logout()} />
    </div>
  );
}
