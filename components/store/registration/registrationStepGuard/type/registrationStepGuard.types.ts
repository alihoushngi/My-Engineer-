import { type ReactNode } from "react";
import { type RegistrationRequestedStep } from "@/lib/registration/guard-path/guard-path";

export type RegistrationStepGuardProps = {
  step: RegistrationRequestedStep;
  children: ReactNode;
};
