/**
 * Registration service — API integration layer.
 *
 * API CONTRACT REQUIRED for all operations.
 * No documented endpoints exist. Functions throw a typed ApiError instead of
 * inventing URLs or fake success payloads.
 */

import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";

export type SendOtpRequest = {
  phone: string;
  nationalId: string;
};

export type VerifyOtpRequest = {
  phone: string;
  code: string;
};

export type SaveServiceAreaRequest = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: readonly string[];
};

export type SaveExpertiseRequest = {
  expertiseIds: readonly string[];
  softwareIds: readonly string[];
};

export type SavePersonalInfoRequest = {
  firstName: string;
  lastName: string;
  /** Avatar upload handled separately. API CONTRACT REQUIRED. */
  avatarUploadId?: string;
};

export type SaveEducationRequest = {
  level: "diplomaOrLower" | "aboveDiploma";
  degrees: readonly string[];
  /** File upload IDs. API CONTRACT REQUIRED. */
  degreeFileUploadIds: Partial<Record<string, string>>;
};

export type SaveOrganizationRequest = {
  isMember: boolean;
  membershipNumber?: string;
  hasLicense?: boolean;
  licenseNumber?: string;
  licenseUploadId?: string;
  discipline?: string;
  qualifications?: readonly string[];
};

export type SaveResumeRequest = {
  experienceYears: number;
  resumeText: string;
};

export type SubmitRegistrationRequest = {
  imageCount: number;
  certificateCount: number;
  acceptRules: true;
};

const API_NOT_AVAILABLE_MESSAGE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";

export async function sendOtp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SendOtpRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function verifyOtp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: VerifyOtpRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function saveServiceArea(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveServiceAreaRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function saveExpertise(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveExpertiseRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function getExpertiseCatalog(): Promise<never> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function savePersonalInfo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SavePersonalInfoRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function saveEducation(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveEducationRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function saveOrganization(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveOrganizationRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function saveResume(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveResumeRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function submitRegistration(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SubmitRegistrationRequest,
): Promise<void> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}
