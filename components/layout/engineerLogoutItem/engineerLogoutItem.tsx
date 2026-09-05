"use client";

import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { DropdownMenuItem } from "@/components/ui/dropdownMenu/dropdownMenu";
import { engineerPanelCopy } from "@/config/engineer-panel.config/engineer-panel.config";
import { useApiMutation } from "@/hooks/use-api-mutation/use-api-mutation";
import { toUserErrorMessage } from "@/lib/errors/to-user-error-message/to-user-error-message";
import { signOutEngineer } from "@/services/engineer-service/engineer-service";
import { useState } from "react";

export function EngineerLogoutItem() {
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
    <div className="px-1">
      <DropdownMenuItem
        variant="danger"
        disabled={mutation.isPending}
        onSelect={(event) => {
          event.preventDefault();
          void handleLogout();
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

type EngineerActionErrorProps = {
  message: string | null;
  onRetry?: () => void;
};

export function EngineerActionError({
  message,
  onRetry,
}: EngineerActionErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <Alert variant="danger">
      <CircleAlertIcon />
      <AlertTitle>عملیات انجام نشد</AlertTitle>
      <AlertDescription>
        <p>{message}</p>
        {onRetry ? (
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={onRetry}
          >
            {engineerPanelCopy.retryLabel}
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
