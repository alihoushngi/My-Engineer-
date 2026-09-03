import { OtpStep } from "@/components/store/registration/otpStep/otpStep";
import { RegistrationStepGuard } from "@/components/store/registration/registrationStepGuard/registrationStepGuard";

export default function OtpPage() {
  return (
    <RegistrationStepGuard step={2}>
      <OtpStep />
    </RegistrationStepGuard>
  );
}
