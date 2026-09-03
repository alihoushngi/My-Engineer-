import { type RegistrationWizardData } from "@/types/store/registration.types";

export const registrationPaths = {
  identity: "/expert-registration",
  otp: "/expert-registration/otp",
  serviceArea: "/expert-registration/service-area",
  expertise: "/expert-registration/expertise",
  personalInfo: "/expert-registration/personal-info",
  education: "/expert-registration/education",
  organization: "/expert-registration/engineering-organization",
  resume: "/expert-registration/professional-resume",
  portfolio: "/expert-registration/portfolio",
  complete: "/expert-registration/complete",
} as const;

export type RegistrationRequestedStep =
  1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "complete";

const PATH_ORDER: readonly string[] = [
  registrationPaths.identity,
  registrationPaths.otp,
  registrationPaths.serviceArea,
  registrationPaths.expertise,
  registrationPaths.personalInfo,
  registrationPaths.education,
  registrationPaths.organization,
  registrationPaths.resume,
  registrationPaths.portfolio,
  registrationPaths.complete,
];

/**
 * Returns the first step the user is allowed to visit given committed wizard state.
 * Refresh without a server draft returns step 1 when earlier commits are missing.
 */
export function getFirstAllowedPath(
  data: RegistrationWizardData,
  maxStep: number,
): string {
  if (!data.identity || maxStep < 2) {
    return registrationPaths.identity;
  }

  if (!data.otpVerified || maxStep < 3) {
    return registrationPaths.otp;
  }

  if (!data.serviceArea || maxStep < 4) {
    return registrationPaths.serviceArea;
  }

  if (!data.expertise || maxStep < 5) {
    return registrationPaths.expertise;
  }

  if (!data.personalInfo || maxStep < 6) {
    return registrationPaths.personalInfo;
  }

  if (!data.education || maxStep < 7) {
    return registrationPaths.education;
  }

  if (!data.organization || maxStep < 8) {
    return registrationPaths.organization;
  }

  if (!data.resume || maxStep < 9) {
    return registrationPaths.resume;
  }

  if (!data.submitted) {
    return registrationPaths.portfolio;
  }

  return registrationPaths.complete;
}

export function canAccessRequestedStep(
  data: RegistrationWizardData,
  maxStep: number,
  requested: RegistrationRequestedStep,
): boolean {
  if (requested === "complete") {
    return data.submitted === true;
  }

  const allowedPath = getFirstAllowedPath(data, maxStep);
  const requestedPath = pathForRequestedStep(requested);

  return PATH_ORDER.indexOf(requestedPath) <= PATH_ORDER.indexOf(allowedPath);
}

function pathForRequestedStep(
  requested: Exclude<RegistrationRequestedStep, "complete">,
): string {
  switch (requested) {
    case 1:
      return registrationPaths.identity;
    case 2:
      return registrationPaths.otp;
    case 3:
      return registrationPaths.serviceArea;
    case 4:
      return registrationPaths.expertise;
    case 5:
      return registrationPaths.personalInfo;
    case 6:
      return registrationPaths.education;
    case 7:
      return registrationPaths.organization;
    case 8:
      return registrationPaths.resume;
    case 9:
      return registrationPaths.portfolio;
  }
}
