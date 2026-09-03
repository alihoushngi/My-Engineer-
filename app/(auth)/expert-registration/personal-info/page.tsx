import { PersonalInfoStep } from "@/components/store/registration/personalInfoStep/personalInfoStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function PersonalInfoPage() {
  return (
    <RegistrationStepGuard step={5}>
      <PersonalInfoStep />
    </RegistrationStepGuard>
  );
}
