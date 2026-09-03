"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  type RegistrationIdentityData,
  type RegistrationMaxStep,
  type RegistrationServiceAreaData,
  type RegistrationWizardData,
} from "@/types/store/registration.types";

type RegistrationWizardContextValue = {
  data: RegistrationWizardData;
  maxStep: RegistrationMaxStep;
  commitIdentity: (identity: RegistrationIdentityData) => void;
  commitOtpVerified: () => void;
  commitServiceArea: (serviceArea: RegistrationServiceAreaData) => void;
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
      // Committing new identity invalidates OTP and service area
      otpVerified: undefined,
      serviceArea: undefined,
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
    },
    [],
  );

  const resetFromStep = useCallback((step: RegistrationMaxStep) => {
    setMaxStep(step);

    if (step === 1) {
      setData({});
    } else if (step === 2) {
      setData((prev) => ({ identity: prev.identity }));
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
        resetFromStep,
      }}
    >
      {children}
    </RegistrationWizardContext.Provider>
  );
}
