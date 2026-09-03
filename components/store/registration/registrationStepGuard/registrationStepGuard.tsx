"use client";

import { useRegistrationStepGuard } from "@/hooks/use-registration-wizard/use-registration-wizard";
import { type RegistrationStepGuardProps } from "@/components/store/registration/registrationStepGuard/type/registrationStepGuard.types";

export function RegistrationStepGuard({
  step,
  children,
}: RegistrationStepGuardProps) {
  const allowed = useRegistrationStepGuard(step);

  if (!allowed) {
    return null;
  }

  return children;
}
