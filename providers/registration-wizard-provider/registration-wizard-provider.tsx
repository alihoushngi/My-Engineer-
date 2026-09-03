"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  type RegistrationEducationData,
  type RegistrationExpertiseData,
  type RegistrationIdentityData,
  type RegistrationMaxStep,
  type RegistrationPersonalInfoData,
  type RegistrationServiceAreaData,
  type RegistrationWizardData,
} from "@/types/store/registration.types";

type RegistrationWizardContextValue = {
  data: RegistrationWizardData;
  maxStep: RegistrationMaxStep;
  commitIdentity: (identity: RegistrationIdentityData) => void;
  commitOtpVerified: () => void;
  commitServiceArea: (serviceArea: RegistrationServiceAreaData) => void;
  commitExpertise: (expertise: RegistrationExpertiseData) => void;
  commitPersonalInfo: (personalInfo: RegistrationPersonalInfoData) => void;
  commitEducation: (education: RegistrationEducationData) => void;
  resetFromStep: (step: RegistrationMaxStep) => void;
};

const RegistrationWizardContext =
  createContext<RegistrationWizardContextValue | null>(null);

export function useRegistrationWizard(): RegistrationWizardContextValue {
  const ctx = useContext(RegistrationWizardContext);

  if (!ctx) {
    throw new Error(
      "useRegistrationWizard must be used inside RegistrationWizardProvider",
    );
  }

  return ctx;
}

type RegistrationWizardProviderProps = {
  children: ReactNode;
};

export function RegistrationWizardProvider({
  children,
}: RegistrationWizardProviderProps) {
  const [data, setData] = useState<RegistrationWizardData>({});
  const [maxStep, setMaxStep] = useState<RegistrationMaxStep>(1);

  const commitIdentity = useCallback((identity: RegistrationIdentityData) => {
    setData((prev) => ({
      ...prev,
      identity,
      // New identity invalidates all subsequent steps
      otpVerified: undefined,
      serviceArea: undefined,
      expertise: undefined,
      personalInfo: undefined,
      education: undefined,
    }));
    setMaxStep(2);
  }, []);

  const commitOtpVerified = useCallback(() => {
    setData((prev) => ({ ...prev, otpVerified: true }));
    setMaxStep(3);
  }, []);

  const commitServiceArea = useCallback(
    (serviceArea: RegistrationServiceAreaData) => {
      setData((prev) => ({ ...prev, serviceArea }));
      setMaxStep((prev) => (prev < 4 ? 4 : prev));
    },
    [],
  );

  const commitExpertise = useCallback(
    (expertise: RegistrationExpertiseData) => {
      setData((prev) => ({
        ...prev,
        expertise,
        // Changing expertise invalidates personal info onward
        personalInfo: undefined,
        education: undefined,
      }));
      setMaxStep((prev) => (prev < 5 ? 5 : prev));
    },
    [],
  );

  const commitPersonalInfo = useCallback(
    (personalInfo: RegistrationPersonalInfoData) => {
      setData((prev) => ({
        ...prev,
        personalInfo,
        education: undefined,
      }));
      setMaxStep((prev) => (prev < 6 ? 6 : prev));
    },
    [],
  );

  const commitEducation = useCallback(
    (education: RegistrationEducationData) => {
      setData((prev) => ({ ...prev, education }));
    },
    [],
  );

  const resetFromStep = useCallback((step: RegistrationMaxStep) => {
    setMaxStep(step);

    if (step === 1) {
      setData({});
    } else if (step === 2) {
      setData((prev) => ({ identity: prev.identity }));
    } else if (step === 3) {
      setData((prev) => ({
        identity: prev.identity,
        otpVerified: prev.otpVerified,
      }));
    } else if (step === 4) {
      setData((prev) => ({
        identity: prev.identity,
        otpVerified: prev.otpVerified,
        serviceArea: prev.serviceArea,
      }));
    } else if (step === 5) {
      setData((prev) => ({
        identity: prev.identity,
        otpVerified: prev.otpVerified,
        serviceArea: prev.serviceArea,
        expertise: prev.expertise,
      }));
    }
  }, []);

  return (
    <RegistrationWizardContext.Provider
      value={{
        data,
        maxStep,
        commitIdentity,
        commitOtpVerified,
        commitServiceArea,
        commitExpertise,
        commitPersonalInfo,
        commitEducation,
        resetFromStep,
      }}
    >
      {children}
    </RegistrationWizardContext.Provider>
  );
}
