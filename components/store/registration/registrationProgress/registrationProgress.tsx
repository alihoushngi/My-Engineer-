import { Progress } from "@/components/ui/progress/progress";
import {
  registrationCopy,
  REGISTRATION_STEPS,
  TOTAL_REGISTRATION_STEPS,
} from "@/config/registration.config/registration.config";

type RegistrationProgressProps = {
  currentStep: number;
};

export function RegistrationProgress({
  currentStep,
}: RegistrationProgressProps) {
  const stepInfo = REGISTRATION_STEPS.find((s) => s.index === currentStep);
  const progressValue = (currentStep / TOTAL_REGISTRATION_STEPS) * 100;

  return (
    <div className="space-y-3 border-b border-border pb-6">
      <div className="flex items-center justify-between gap-4">
        <p className="shrink-0 type-body-sm text-muted-foreground">
          {registrationCopy.stepOf(currentStep, TOTAL_REGISTRATION_STEPS)}
        </p>
        {stepInfo ? (
          <p className="min-w-0 type-body-sm font-medium text-foreground">
            {stepInfo.label}
          </p>
        ) : null}
      </div>
      <Progress
        value={progressValue}
        aria-label={`پیشرفت ثبت‌نام: مرحله ${currentStep} از ${TOTAL_REGISTRATION_STEPS}`}
      />
    </div>
  );
}
