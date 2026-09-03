import { ProfessionalResumeStep } from "@/components/store/registration/professionalResumeStep/professionalResumeStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function ProfessionalResumePage() {
  return (
    <RegistrationStepGuard step={8}>
      <ProfessionalResumeStep />
    </RegistrationStepGuard>
  );
}
