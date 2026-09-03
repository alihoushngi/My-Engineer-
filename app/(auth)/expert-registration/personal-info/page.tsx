"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { PersonalInfoStep } from "@/components/store/registration/personalInfoStep/personalInfoStep";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";

function PersonalInfoStepGuarded() {
  const router = useRouter();
  const { data, maxStep } = useRegistrationWizard();

  useEffect(() => {
    if (!data.expertise || maxStep < 5) {
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
      } else {
        router.replace("/expert-registration/expertise");
      }
    }
  }, [
    data.identity,
    data.otpVerified,
    data.serviceArea,
    data.expertise,
    maxStep,
    router,
  ]);

  if (!data.expertise || maxStep < 5) {
    return null;
  }

  return <PersonalInfoStep />;
}

export default function PersonalInfoPage() {
  return <PersonalInfoStepGuarded />;
}
