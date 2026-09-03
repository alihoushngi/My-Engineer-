import { PortfolioStep } from "@/components/store/registration/portfolioStep/portfolioStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function PortfolioPage() {
  return (
    <RegistrationStepGuard step={9}>
      <PortfolioStep />
    </RegistrationStepGuard>
  );
}
