"use client";

import { OrganizationStep } from "@/components/store/registration/organizationStep/organizationStep";
import { useRegistrationStepGuard } from "@/hooks/use-registration-wizard/use-registration-wizard";

export default function OrganizationPage() {
  const allowed = useRegistrationStepGuard(7);

  if (!allowed) {
    return null;
  }

  return <OrganizationStep />;
}
