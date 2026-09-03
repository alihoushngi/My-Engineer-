"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  canAccessRequestedStep,
  getFirstAllowedPath,
  type RegistrationRequestedStep,
} from "@/lib/registration/guard-path/guard-path";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";

/**
 * Redirects to the first valid wizard step when the requested step is not allowed.
 */
export function useRegistrationStepGuard(
  requested: RegistrationRequestedStep,
): boolean {
  const router = useRouter();
  const { data, maxStep } = useRegistrationWizard();
  const allowed = canAccessRequestedStep(data, maxStep, requested);

  useEffect(() => {
    if (!allowed) {
      router.replace(getFirstAllowedPath(data, maxStep));
    }
  }, [allowed, data, maxStep, router]);

  return allowed;
}
