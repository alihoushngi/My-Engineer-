import { OrganizationStep } from "@/components/store/registration/organizationStep/organizationStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function OrganizationPage() {
  return (
    <RegistrationStepGuard step={7}>
      <OrganizationStep />
    </RegistrationStepGuard>
  );
}
