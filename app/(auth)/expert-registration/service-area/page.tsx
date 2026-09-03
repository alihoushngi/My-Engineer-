import { ServiceAreaStep } from "@/components/store/registration/serviceAreaStep/serviceAreaStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function ServiceAreaPage() {
  return (
    <RegistrationStepGuard step={3}>
      <ServiceAreaStep />
    </RegistrationStepGuard>
  );
}
