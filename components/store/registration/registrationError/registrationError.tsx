"use client";

import { CircleAlertIcon } from "lucide-react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import { registrationCopy } from "@/config/registration.config/registration.config";

type RegistrationErrorProps = {
  message?: string;
  onRetry?: () => void;
};

export function RegistrationError({
  message = registrationCopy.errorGenericDescription,
  onRetry,
}: RegistrationErrorProps) {
  return (
    <Alert variant="danger">
      <CircleAlertIcon />
      <AlertTitle>{registrationCopy.errorGenericTitle}</AlertTitle>
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
            {registrationCopy.retryLabel}
          </Button>
        ) : null}
      </AlertDescription>
    </Alert>
  );
}
