"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ServiceAreaStep } from "@/components/store/registration/serviceAreaStep/serviceAreaStep";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";

function ServiceAreaStepGuarded() {
  const router = useRouter();
  const { data, maxStep } = useRegistrationWizard();

  useEffect(() => {
    if (!data.otpVerified || maxStep < 3) {
      if (!data.identity || maxStep < 2) {
        router.replace("/expert-registration");
      } else {
        router.replace("/expert-registration/otp");
      }
    }
  }, [data.identity, data.otpVerified, maxStep, router]);

  if (!data.otpVerified || maxStep < 3) {
    return null;
  }

  return <ServiceAreaStep />;
}

export default function ServiceAreaPage() {
  return <ServiceAreaStepGuarded />;
}
