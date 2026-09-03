import { RegistrationComplete } from "@/components/store/registration/registrationComplete/registrationComplete";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function CompletePage() {
  return (
    <RegistrationStepGuard step="complete">
      <RegistrationComplete />
    </RegistrationStepGuard>
  );
}
