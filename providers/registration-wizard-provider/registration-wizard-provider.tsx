"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
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
import {
  getServerWizardSnapshot,
  getWizardSnapshot,
  hydrateWizardFromStorage,
  patchWizardState,
  resetWizardStore,
  subscribeWizard,
} from "@/lib/registration/mock-wizard-store/mock-wizard-store";

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
  persistMockState?: boolean;
};

function raiseMaxStep(
  prev: RegistrationMaxStep,
  next: RegistrationMaxStep,
): RegistrationMaxStep {
  return prev < next ? next : prev;
}

export function RegistrationWizardProvider({
  children,
  persistMockState = false,
}: RegistrationWizardProviderProps) {
  const snapshot = useSyncExternalStore(
    subscribeWizard,
    getWizardSnapshot,
    getServerWizardSnapshot,
  );

  useEffect(() => {
    if (persistMockState) {
      hydrateWizardFromStorage();
      return;
    }

    resetWizardStore();
  }, [persistMockState]);

  const commitIdentity = useCallback(
    (identity: RegistrationIdentityData) => {
      patchWizardState(persistMockState, () => ({
        data: { identity },
        maxStep: 2,
      }));
    },
    [persistMockState],
  );

  const commitOtpVerified = useCallback(() => {
    patchWizardState(persistMockState, (prev) => ({
      data: { ...prev.data, otpVerified: true },
      maxStep: 3,
    }));
  }, [persistMockState]);

  const commitServiceArea = useCallback(
    (serviceArea: RegistrationServiceAreaData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: { ...prev.data, serviceArea },
        maxStep: raiseMaxStep(prev.maxStep, 4),
      }));
    },
    [persistMockState],
  );

  const commitExpertise = useCallback(
    (expertise: RegistrationExpertiseData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: {
          ...prev.data,
          expertise,
          personalInfo: undefined,
          education: undefined,
          organization: undefined,
          resume: undefined,
          portfolio: undefined,
          submitted: undefined,
        },
        maxStep: raiseMaxStep(prev.maxStep, 5),
      }));
    },
    [persistMockState],
  );

  const commitPersonalInfo = useCallback(
    (personalInfo: RegistrationPersonalInfoData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: {
          ...prev.data,
          personalInfo,
          education: undefined,
          organization: undefined,
          resume: undefined,
          portfolio: undefined,
          submitted: undefined,
        },
        maxStep: raiseMaxStep(prev.maxStep, 6),
      }));
    },
    [persistMockState],
  );

  const commitEducation = useCallback(
    (education: RegistrationEducationData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: {
          ...prev.data,
          education,
          organization: undefined,
          resume: undefined,
          portfolio: undefined,
          submitted: undefined,
        },
        maxStep: raiseMaxStep(prev.maxStep, 7),
      }));
    },
    [persistMockState],
  );

  const commitOrganization = useCallback(
    (organization: RegistrationOrganizationData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: {
          ...prev.data,
          organization,
          resume: undefined,
          portfolio: undefined,
          submitted: undefined,
        },
        maxStep: raiseMaxStep(prev.maxStep, 8),
      }));
    },
    [persistMockState],
  );

  const commitResume = useCallback(
    (resume: RegistrationResumeData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: {
          ...prev.data,
          resume,
          portfolio: undefined,
          submitted: undefined,
        },
        maxStep: raiseMaxStep(prev.maxStep, 9),
      }));
    },
    [persistMockState],
  );

  const commitSubmitted = useCallback(
    (portfolio: RegistrationPortfolioData) => {
      patchWizardState(persistMockState, (prev) => ({
        data: {
          ...prev.data,
          portfolio,
          submitted: true,
        },
        maxStep: prev.maxStep,
      }));
    },
    [persistMockState],
  );

  const resetFromStep = useCallback(
    (step: RegistrationMaxStep) => {
      patchWizardState(persistMockState, (prev) => ({
        maxStep: step,
        data: dataAfterReset(prev.data, step),
      }));
    },
    [persistMockState],
  );

  return (
    <RegistrationWizardContext.Provider
      value={{
        data: snapshot.data,
        maxStep: snapshot.maxStep,
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

function dataAfterReset(
  data: RegistrationWizardData,
  step: RegistrationMaxStep,
): RegistrationWizardData {
  if (step === 1) return {};
  if (step === 2) return { identity: data.identity };
  if (step === 3) {
    return { identity: data.identity, otpVerified: data.otpVerified };
  }
  if (step === 4) {
    return {
      identity: data.identity,
      otpVerified: data.otpVerified,
      serviceArea: data.serviceArea,
    };
  }
  if (step === 5) {
    return {
      identity: data.identity,
      otpVerified: data.otpVerified,
      serviceArea: data.serviceArea,
      expertise: data.expertise,
    };
  }
  if (step === 6) {
    return {
      identity: data.identity,
      otpVerified: data.otpVerified,
      serviceArea: data.serviceArea,
      expertise: data.expertise,
      personalInfo: data.personalInfo,
    };
  }
  if (step === 7) {
    return {
      identity: data.identity,
      otpVerified: data.otpVerified,
      serviceArea: data.serviceArea,
      expertise: data.expertise,
      personalInfo: data.personalInfo,
      education: data.education,
    };
  }
  return {
    identity: data.identity,
    otpVerified: data.otpVerified,
    serviceArea: data.serviceArea,
    expertise: data.expertise,
    personalInfo: data.personalInfo,
    education: data.education,
    organization: data.organization,
  };
}
