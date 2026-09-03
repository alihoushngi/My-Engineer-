"use client";

import { type ReactNode } from "react";
import { registrationCopy } from "@/config/registration.config/registration.config";

type RegistrationShellProps = {
  children: ReactNode;
};

/**
 * Visual shell wrapping all wizard steps.
 * Progress is embedded inside each step component (RegistrationProgress) so
 * it reflects the correct current step number.
 * The provider is mounted in the layout above this component.
 */
export function RegistrationShell({ children }: RegistrationShellProps) {
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="space-y-1">
        <h1 className="type-h2 font-semibold text-foreground">
          {registrationCopy.wizardTitle}
        </h1>
      </div>
      {children}
    </div>
  );
}
