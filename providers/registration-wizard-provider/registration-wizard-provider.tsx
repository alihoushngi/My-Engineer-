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
  type RegistrationOrganizationData,
  type RegistrationPersonalInfoData,
  type RegistrationPortfolioData,
  type RegistrationResumeData,
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
  commitOrganization: (organization: RegistrationOrganizationData) => void;
  commitResume: (resume: RegistrationResumeData) => void;
  commitSubmitted: (portfolio: RegistrationPortfolioData) => void;
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

function raiseMaxStep(
  prev: RegistrationMaxStep,
  next: RegistrationMaxStep,
): RegistrationMaxStep {
  return prev < next ? next : prev;
}

export function RegistrationWizardProvider({
  children,
}: RegistrationWizardProviderProps) {
  const [data, setData] = useState<RegistrationWizardData>({});
  const [maxStep, setMaxStep] = useState<RegistrationMaxStep>(1);

  const commitIdentity = useCallback((identity: RegistrationIdentityData) => {
    setData({ identity });
    setMaxStep(2);
  }, []);

  const commitOtpVerified = useCallback(() => {
    setData((prev) => ({ ...prev, otpVerified: true }));
    setMaxStep(3);
  }, []);

  const commitServiceArea = useCallback(
    (serviceArea: RegistrationServiceAreaData) => {
      setData((prev) => ({ ...prev, serviceArea }));
      setMaxStep((prev) => raiseMaxStep(prev, 4));
    },
    [],
  );

  const commitExpertise = useCallback(
    (expertise: RegistrationExpertiseData) => {
      setData((prev) => ({
        ...prev,
        expertise,
        personalInfo: undefined,
        education: undefined,
        organization: undefined,
        resume: undefined,
        portfolio: undefined,
        submitted: undefined,
      }));
      setMaxStep((prev) => raiseMaxStep(prev, 5));
    },
    [],
  );

  const commitPersonalInfo = useCallback(
    (personalInfo: RegistrationPersonalInfoData) => {
      setData((prev) => ({
        ...prev,
        personalInfo,
        education: undefined,
        organization: undefined,
        resume: undefined,
        portfolio: undefined,
        submitted: undefined,
      }));
      setMaxStep((prev) => raiseMaxStep(prev, 6));
    },
    [],
  );

  const commitEducation = useCallback(
    (education: RegistrationEducationData) => {
      setData((prev) => ({
        ...prev,
        education,
        organization: undefined,
        resume: undefined,
        portfolio: undefined,
        submitted: undefined,
      }));
      setMaxStep((prev) => raiseMaxStep(prev, 7));
    },
    [],
  );

  const commitOrganization = useCallback(
    (organization: RegistrationOrganizationData) => {
      setData((prev) => ({
        ...prev,
        organization,
        resume: undefined,
        portfolio: undefined,
        submitted: undefined,
      }));
      setMaxStep((prev) => raiseMaxStep(prev, 8));
    },
    [],
  );

  const commitResume = useCallback((resume: RegistrationResumeData) => {
    setData((prev) => ({
      ...prev,
      resume,
      portfolio: undefined,
      submitted: undefined,
    }));
    setMaxStep((prev) => raiseMaxStep(prev, 9));
  }, []);

  const commitSubmitted = useCallback(
    (portfolio: RegistrationPortfolioData) => {
      setData((prev) => ({
        ...prev,
        portfolio,
        submitted: true,
      }));
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
    } else if (step === 6) {
      setData((prev) => ({
        identity: prev.identity,
        otpVerified: prev.otpVerified,
        serviceArea: prev.serviceArea,
        expertise: prev.expertise,
        personalInfo: prev.personalInfo,
      }));
    } else if (step === 7) {
      setData((prev) => ({
        identity: prev.identity,
        otpVerified: prev.otpVerified,
        serviceArea: prev.serviceArea,
        expertise: prev.expertise,
        personalInfo: prev.personalInfo,
        education: prev.education,
      }));
    } else if (step === 8) {
      setData((prev) => ({
        identity: prev.identity,
        otpVerified: prev.otpVerified,
        serviceArea: prev.serviceArea,
        expertise: prev.expertise,
        personalInfo: prev.personalInfo,
        education: prev.education,
        organization: prev.organization,
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
        commitOrganization,
        commitResume,
        commitSubmitted,
        resetFromStep,
      }}
    >
      {children}
    </RegistrationWizardContext.Provider>
  );
}
