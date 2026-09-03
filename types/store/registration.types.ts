export type Province = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  name: string;
  provinceId: string;
};

export type RegistrationIdentityData = {
  phone: string;
  nationalId: string;
};

export type RegistrationServiceAreaData = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: readonly string[];
};

export type RegistrationExpertiseData = {
  expertiseIds: readonly string[];
  softwareIds: readonly string[];
};

export type RegistrationPersonalInfoData = {
  firstName: string;
  lastName: string;
  /** Avatar file reference — local File object until upload API exists. */
  avatarFile?: File;
};

export type EducationLevel = "diplomaOrLower" | "aboveDiploma";

export type DegreeKey =
  "associate" | "bachelor" | "master" | "doctorate" | "diploma";

export type RegistrationEducationData = {
  level: EducationLevel;
  degrees: readonly DegreeKey[];
  /**
   * Uploaded file per degree key.
   * API CONTRACT REQUIRED for actual upload endpoint.
   * Kept as File objects until upload service is established.
   */
  degreeFiles: Partial<Record<DegreeKey, File>>;
};

/**
 * Aggregated committed registration data.
 * Values are set only after each step succeeds (API or local-schema commit).
 * API CONTRACT REQUIRED for step-level persistence.
 */
export type RegistrationWizardData = {
  identity?: RegistrationIdentityData;
  otpVerified?: boolean;
  serviceArea?: RegistrationServiceAreaData;
  expertise?: RegistrationExpertiseData;
  personalInfo?: RegistrationPersonalInfoData;
  education?: RegistrationEducationData;
};

/** Maximum step index the user is currently allowed to visit. */
export type RegistrationMaxStep = 1 | 2 | 3 | 4 | 5 | 6;
