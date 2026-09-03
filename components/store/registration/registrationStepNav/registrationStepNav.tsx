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
    <div className="glass-chrome sticky bottom-0 z-10 mt-2 bleed-page-x border-t border-border py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:static sm:z-auto sm:mt-0 sm:border-0 sm:bg-transparent sm:p-0 sm:[backdrop-filter:none] sm:mx-0 sm:px-0">
      <div className="flex flex-col gap-3 sm:flex-row">
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
    </div>
  );
}
