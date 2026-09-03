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

/** SOURCE: legacy step7 discipline keys. Do not invent additional disciplines. */
export type EngineeringDiscipline =
  | "omran"
  | "bargh"
  | "mechanic"
  | "memari"
  | "naghshe"
  | "traffic"
  | "shahrsazi";

/** SOURCE: طراحی، نظارت، اجرا. naghshe has no اجرا. */
export type EngineeringQualification = "design" | "supervision" | "execution";

export type RegistrationOrganizationData = {
  isMember: boolean;
  membershipNumber?: string;
  hasLicense?: boolean;
  licenseNumber?: string;
  licenseFile?: File;
  discipline?: EngineeringDiscipline;
  qualifications?: readonly EngineeringQualification[];
};

export type RegistrationResumeData = {
  experienceYears: number;
  resumeText: string;
};

export type PortfolioImageEntry = {
  id: string;
  file: File;
};

export type CertificateEntry = {
  id: string;
  title: string;
  file?: File;
};

export type RegistrationPortfolioData = {
  images: readonly PortfolioImageEntry[];
  certificates: readonly CertificateEntry[];
  acceptRules: true;
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
  organization?: RegistrationOrganizationData;
  resume?: RegistrationResumeData;
  portfolio?: RegistrationPortfolioData;
  submitted?: boolean;
};

/** Maximum step index the user is currently allowed to visit. */
export type RegistrationMaxStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
