import { ExpertiseStep } from "@/components/store/registration/expertiseStep/expertiseStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function ExpertisePage() {
  return (
    <RegistrationStepGuard step={4}>
      <ExpertiseStep />
    </RegistrationStepGuard>
  );
}
