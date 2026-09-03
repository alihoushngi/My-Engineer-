"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { EducationStep } from "@/components/store/registration/educationStep/educationStep";
import { useRegistrationWizard } from "@/providers/registration-wizard-provider/registration-wizard-provider";

function EducationStepGuarded() {
  const router = useRouter();
  const { data, maxStep } = useRegistrationWizard();

  useEffect(() => {
    if (!data.personalInfo || maxStep < 6) {
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
      } else {
        router.replace("/expert-registration/personal-info");
      }
    }
  }, [
    data.identity,
    data.otpVerified,
    data.serviceArea,
    data.expertise,
    data.personalInfo,
    maxStep,
    router,
  ]);

  if (!data.personalInfo || maxStep < 6) {
    return null;
  }

  return <EducationStep />;
}

export default function EducationPage() {
  return <EducationStepGuarded />;
}
