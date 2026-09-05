/**
 * Registration service — API integration layer.
 *
 * Mock registration is explicit (mockRegister.enabled + non-production).
 * Real APIs remain unavailable when mock mode is off.
 * Do not fall back to mock success after a real API failure.
 */

import { ApiError } from "@/lib/api/api-error/api-error";
import { throwIfMutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  getExpertiseCatalogAction,
  saveRegistrationStepAction,
  sendOtpAction,
  submitRegistrationAction,
  verifyOtpAction,
} from "@/services/registration-service/registration-actions";
import {
  type ExpertiseCatalogResult,
  type SaveEducationRequest,
  type SaveExpertiseRequest,
  type SaveOrganizationRequest,
  type SavePersonalInfoRequest,
  type SaveResumeRequest,
  type SaveServiceAreaRequest,
  type SendOtpRequest,
  type SubmitRegistrationRequest,
  type VerifyOtpRequest,
} from "@/services/registration-service/registration-service.types";

export type {
  SaveEducationRequest,
  SaveExpertiseRequest,
  SaveOrganizationRequest,
  SavePersonalInfoRequest,
  SaveResumeRequest,
  SaveServiceAreaRequest,
  SendOtpRequest,
  SubmitRegistrationRequest,
  VerifyOtpRequest,
};

export async function sendOtp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SendOtpRequest,
): Promise<void> {
  throwIfMutationFailed(await sendOtpAction());
}

export async function verifyOtp(request: VerifyOtpRequest): Promise<void> {
  throwIfMutationFailed(await verifyOtpAction(request));
}

export async function saveServiceArea(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveServiceAreaRequest,
): Promise<void> {
  throwIfMutationFailed(await saveRegistrationStepAction());
}

export async function saveExpertise(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveExpertiseRequest,
): Promise<void> {
  throwIfMutationFailed(await saveRegistrationStepAction());
}

export async function getExpertiseCatalog(): Promise<ExpertiseCatalogResult> {
  const result = await getExpertiseCatalogAction();

  if (!result.ok) {
    throw new ApiError({
      status: result.status,
      code: result.code,
      message: result.message,
    });
  }

  return result.catalog;
}

export async function savePersonalInfo(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SavePersonalInfoRequest,
): Promise<void> {
  throwIfMutationFailed(await saveRegistrationStepAction());
}

export async function saveEducation(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveEducationRequest,
): Promise<void> {
  throwIfMutationFailed(await saveRegistrationStepAction());
}

export async function saveOrganization(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveOrganizationRequest,
): Promise<void> {
  throwIfMutationFailed(await saveRegistrationStepAction());
}

export async function saveResume(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveResumeRequest,
): Promise<void> {
  throwIfMutationFailed(await saveRegistrationStepAction());
}

export async function submitRegistration(
  request: SubmitRegistrationRequest,
): Promise<void> {
  throwIfMutationFailed(await submitRegistrationAction(request));
}
