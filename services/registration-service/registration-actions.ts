"use server";

import { isMockRegisterEnabled } from "@/config/mock-auth.config/mock-auth.config";
import {
  mockRegistrationStep,
  mockVerifyRegistrationOtp,
} from "@/lib/auth/mock-registration-adapter/mock-registration-adapter";
import { serializeMockEngineerProfileCookie } from "@/lib/auth/mock-engineer-profile-cookie/mock-engineer-profile-cookie";
import { writeMockEngineerSession } from "@/lib/auth/engineer-session/engineer-session";
import { getMockExpertiseCatalog } from "@/lib/mock-data/registration-expertise-catalog/registration-expertise-catalog";
import { mutationUnavailable } from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationFailure } from "@/types/store/engineer-auth.types";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";
import {
  type SubmitRegistrationRequest,
  type VerifyOtpRequest,
} from "@/services/registration-service/registration-service.types";
import { type MockExpertiseCatalog } from "@/lib/mock-data/registration-expertise-catalog/registration-expertise-catalog";

const API_NOT_AVAILABLE_MESSAGE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";

function realUnavailable(): ServiceMutationFailure {
  return mutationUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function sendOtpAction(): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function verifyOtpAction(
  request: VerifyOtpRequest,
): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockVerifyRegistrationOtp({ code: request.code });
}

export async function saveRegistrationStepAction(): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  return mockRegistrationStep();
}

export async function submitRegistrationAction(
  request: SubmitRegistrationRequest,
): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  const result = await mockRegistrationStep();

  if (!result.ok) {
    return result;
  }

  await writeMockEngineerSession({
    source: "registration",
    profileCookieValue: request.profile
      ? serializeMockEngineerProfileCookie(request.profile)
      : undefined,
  });

  return { ok: true };
}

export async function getExpertiseCatalogAction(): Promise<
  { ok: true; catalog: MockExpertiseCatalog } | ServiceMutationFailure
> {
  if (!isMockRegisterEnabled()) {
    return realUnavailable();
  }

  const step = await mockRegistrationStep();

  if (!step.ok) {
    return step;
  }

  return { ok: true, catalog: getMockExpertiseCatalog() };
}
