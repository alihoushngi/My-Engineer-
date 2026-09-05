import { getMockEngineerWorkspace } from "@/lib/mock-data/build-engineer-workspace/build-engineer-workspace";
import { maskIranianMobile } from "@/lib/auth/mask-iranian-mobile/mask-iranian-mobile";
import { mockAuthConfig } from "@/config/mock-auth.config/mock-auth.config";
import {
  type EngineerSession,
  type MockEngineerProfileSnapshot,
} from "@/types/store/engineer-auth.types";
import { type EngineerWorkspace } from "@/types/store/engineer.types";

/**
 * Builds a workspace copy for the mock session.
 * Does not mutate imported mock-data constants.
 */
export function buildSessionEngineerWorkspace(
  session: EngineerSession,
): EngineerWorkspace {
  const base = getMockEngineerWorkspace();
  const profile = session.profile;

  if (!profile) {
    return {
      ...base,
      account: {
        ...base.account,
        id: "mock-engineer-session",
        mobileDisplay: maskIranianMobile(mockAuthConfig.mockLogin.phone),
        accessStatus: "active",
      },
    };
  }

  return overlayRegistrationProfile(base, profile);
}

function overlayRegistrationProfile(
  base: EngineerWorkspace,
  profile: MockEngineerProfileSnapshot,
): EngineerWorkspace {
  const firstName = profile.firstName ?? base.profile.firstName;
  const lastName = profile.lastName ?? base.profile.lastName;
  const displayName = `${firstName} ${lastName}`.trim();
  const cityName = profile.cityName ?? base.serviceArea.cityName;
  const specialties = profile.specialties ?? base.profile.specialties;
  const software = profile.software ?? base.profile.software;
  const resumeText = profile.resumeText ?? base.profile.history;
  const experienceYears =
    profile.experienceYears ?? base.profile.experienceYears;
  const education =
    profile.educationLabels && profile.educationLabels.length > 0
      ? profile.educationLabels.map((degree) => ({ degree }))
      : base.profile.education;

  return {
    ...base,
    account: {
      ...base.account,
      id: "mock-engineer-session",
      displayName,
      profession: profile.profession ?? base.account.profession,
      mobileDisplay: maskIranianMobile(mockAuthConfig.mockLogin.phone),
      accessStatus: "pending_review",
      verificationStatus: "pending_review",
    },
    profile: {
      ...base.profile,
      firstName,
      lastName,
      profession: profile.profession ?? base.profile.profession,
      about: resumeText,
      history: resumeText,
      specialties: [...specialties],
      software: [...software],
      experienceYears,
      education,
      serviceCities: [cityName],
      organizationMembership:
        profile.isOrganizationMember === false
          ? undefined
          : base.profile.organizationMembership,
    },
    serviceArea: {
      ...base.serviceArea,
      provinceId: profile.provinceId ?? base.serviceArea.provinceId,
      provinceName: profile.provinceName ?? base.serviceArea.provinceName,
      cityId: profile.cityId ?? base.serviceArea.cityId,
      cityName,
    },
    services: base.services.map((service) => ({
      ...service,
      specialties: [...specialties],
    })),
  };
}
