"use client";

import { ProfessionalResumeStep } from "@/components/store/registration/professionalResumeStep/professionalResumeStep";
import { useRegistrationStepGuard } from "@/hooks/use-registration-wizard/use-registration-wizard";

export default function ProfessionalResumePage() {
  const allowed = useRegistrationStepGuard(8);

  if (!allowed) {
    return null;
  }

  return <ProfessionalResumeStep />;
}
