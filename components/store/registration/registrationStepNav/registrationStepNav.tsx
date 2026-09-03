"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { registrationCopy } from "@/config/registration.config/registration.config";

type RegistrationStepNavProps = {
  onBack?: () => void;
  onContinue: () => void;
  continueLabel?: string;
  backLabel?: string;
  isBackDisabled?: boolean;
  isPending?: boolean;
  isContinueDisabled?: boolean;
};

export function RegistrationStepNav({
  onBack,
  onContinue,
  continueLabel = registrationCopy.continueLabel,
  backLabel = registrationCopy.backLabel,
  isBackDisabled = false,
  isPending = false,
  isContinueDisabled = false,
}: RegistrationStepNavProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row-reverse">
      <Button
        type="button"
        onClick={onContinue}
        loading={isPending}
        disabled={isContinueDisabled || isPending}
        className="flex-1 sm:flex-none sm:min-w-40"
      >
        {continueLabel}
        <ChevronLeftIcon aria-hidden="true" className="ltr:hidden" />
        <ChevronRightIcon aria-hidden="true" className="rtl:hidden" />
      </Button>
      {onBack ? (
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={isBackDisabled || isPending}
          className="flex-1 sm:flex-none"
        >
          <ChevronRightIcon aria-hidden="true" className="ltr:hidden" />
          <ChevronLeftIcon aria-hidden="true" className="rtl:hidden" />
          {backLabel}
        </Button>
      ) : null}
    </div>
  );
}
