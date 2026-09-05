"use client";

import { useState } from "react";
import { EngineerActionError } from "@/components/layout/engineerLogoutItem/engineerLogoutItem";
import { Button } from "@/components/ui/button/button";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { signOutEngineer } from "@/services/engineer-service/engineer-service";

export function EngineerLogoutButton() {
  const [error, setError] = useState<string | null>(null);
  const mutation = useApiMutation(signOutEngineer);

  async function handleLogout() {
    setError(null);

    try {
      await mutation.mutateAsync();
    } catch (err) {
      setError(toUserErrorMessage(err, engineerPanelCopy.logoutUnavailable));
    }
  }

  return (
    <div className="space-y-3">
      <Button
        type="button"
        variant="outline"
        loading={mutation.isPending}
        onClick={() => void handleLogout()}
      >
        {engineerPanelCopy.logoutLabel}
      </Button>
      <EngineerActionError
        message={error}
        onRetry={() => void handleLogout()}
      />
    </div>
  );
}
