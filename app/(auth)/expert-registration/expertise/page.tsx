"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ExpertiseStep } from "@/components/store/registration/expertiseStep/expertiseStep";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";

function ExpertiseStepGuarded() {
  const router = useRouter();
  const { data, maxStep } = useRegistrationWizard();

  useEffect(() => {
    if (!data.serviceArea || maxStep < 4) {
      if (!data.otpVerified || maxStep < 3) {
        if (!data.identity || maxStep < 2) {
          router.replace("/expert-registration");
        } else {
          router.replace("/expert-registration/otp");
        }
      } else {
        router.replace("/expert-registration/service-area");
      }
    }
  }, [data.identity, data.otpVerified, data.serviceArea, maxStep, router]);

  if (!data.serviceArea || maxStep < 4) {
    return null;
  }

  return <ExpertiseStep />;
}

export default function ExpertisePage() {
  return <ExpertiseStepGuarded />;
}
