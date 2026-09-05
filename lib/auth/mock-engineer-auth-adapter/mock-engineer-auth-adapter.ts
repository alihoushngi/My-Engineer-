import {
  isMockLoginEnabled,
  mockAuthConfig,
} from "@/config/mock-auth.config/mock-auth.config";
import { wait } from "@/lib/auth/wait/wait";
import { sameCredential } from "@/lib/auth/same-credential/same-credential";
import {
  mutationFailed,
  mutationUnauthorized,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const INVALID_PASSWORD_MESSAGE = "شماره موبایل یا رمز عبور صحیح نیست.";
const INVALID_OTP_MESSAGE = "کد واردشده صحیح نیست.";
const FORCED_ERROR_MESSAGE = "خطای آزمایشی ورود فعال است.";

export async function mockLoginWithPassword(input: {
  phone: string;
  password: string;
}): Promise<ServiceMutationResult> {
  if (!isMockLoginEnabled()) {
    return mutationFailed("ورود آزمایشی غیرفعال است.");
  }

  await wait(mockAuthConfig.mockLogin.delayMs);

  if (mockAuthConfig.mockLogin.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  const phoneOk = sameCredential(input.phone, mockAuthConfig.mockLogin.phone);
  const passwordOk = sameCredential(
    input.password,
    mockAuthConfig.mockLogin.password,
  );

  if (!phoneOk || !passwordOk) {
    return mutationUnauthorized(INVALID_PASSWORD_MESSAGE);
  }

  return { ok: true };
}

export async function mockRequestLoginOtp(input: {
  phone: string;
}): Promise<ServiceMutationResult> {
  if (!isMockLoginEnabled()) {
    return mutationFailed("ورود آزمایشی غیرفعال است.");
  }

  await wait(mockAuthConfig.mockLogin.delayMs);

  if (mockAuthConfig.mockLogin.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (!sameCredential(input.phone, mockAuthConfig.mockLogin.phone)) {
    return mutationUnauthorized(INVALID_PASSWORD_MESSAGE);
  }

  return { ok: true };
}

export async function mockLoginWithOtp(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
  if (!isMockLoginEnabled()) {
    return mutationFailed("ورود آزمایشی غیرفعال است.");
  }

  await wait(mockAuthConfig.mockLogin.delayMs);

  if (mockAuthConfig.mockLogin.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (!sameCredential(input.phone, mockAuthConfig.mockLogin.phone)) {
    return mutationUnauthorized(INVALID_PASSWORD_MESSAGE);
  }

  if (!sameCredential(input.otp, mockAuthConfig.mockLogin.otp)) {
    return mutationUnauthorized(INVALID_OTP_MESSAGE);
  }

  return { ok: true };
}
