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
    <div className="sticky bottom-0 z-10 mt-8 border-t border-border bg-surface py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:static sm:pt-6">
      <div className="flex flex-row-reverse gap-3">
        <Button
          type="button"
          onClick={onContinue}
          loading={isPending}
          disabled={isContinueDisabled || isPending}
          className="min-w-0 flex-1 sm:max-w-64"
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
            className="shrink-0"
          >
            <ChevronRightIcon aria-hidden="true" className="ltr:hidden" />
            <ChevronLeftIcon aria-hidden="true" className="rtl:hidden" />
            {backLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}
