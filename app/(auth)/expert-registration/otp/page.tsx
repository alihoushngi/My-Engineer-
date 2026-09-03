"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { OtpStep } from "@/components/store/registration/otpStep/otpStep";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";

/**
 * Guard wrapper: redirects to step 1 if identity has not been submitted.
 */
function OtpStepGuarded() {
  const router = useRouter();
  const { data, maxStep } = useRegistrationWizard();

  useEffect(() => {
    if (!data.identity || maxStep < 2) {
      router.replace("/expert-registration");
    }
  }, [data.identity, maxStep, router]);

  if (!data.identity || maxStep < 2) {
    return null;
  }

  return <OtpStep />;
}

export default function OtpPage() {
  return <OtpStepGuarded />;
}
