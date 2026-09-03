"use client";

import { RegistrationComplete } from "@/components/store/registration/registrationComplete/registrationComplete";
import { useRegistrationStepGuard } from "@/hooks/use-registration-wizard/use-registration-wizard";

export default function CompletePage() {
  const allowed = useRegistrationStepGuard("complete");

  if (!allowed) {
    return null;
  }

  return <RegistrationComplete />;
}
