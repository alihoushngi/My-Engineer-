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

/**
 * Aggregated committed registration data.
 * Values are set only after each step succeeds (API or local-schema commit).
 * API CONTRACT REQUIRED for step-level persistence.
 */
export type RegistrationWizardData = {
  identity?: RegistrationIdentityData;
  otpVerified?: boolean;
  serviceArea?: RegistrationServiceAreaData;
};

/** Maximum step index the user is currently allowed to visit. */
export type RegistrationMaxStep = 1 | 2 | 3;
