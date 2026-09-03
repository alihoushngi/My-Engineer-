"use client";

import { PortfolioStep } from "@/components/store/registration/portfolioStep/portfolioStep";
import { useRegistrationStepGuard } from "@/hooks/use-registration-wizard/use-registration-wizard";

export default function PortfolioPage() {
  const allowed = useRegistrationStepGuard(9);

  if (!allowed) {
    return null;
  }

  return <PortfolioStep />;
}
