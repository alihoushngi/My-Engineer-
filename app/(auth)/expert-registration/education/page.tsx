import { EducationStep } from "@/components/store/registration/educationStep/educationStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function EducationPage() {
  return (
    <RegistrationStepGuard step={6}>
      <EducationStep />
    </RegistrationStepGuard>
  );
}
