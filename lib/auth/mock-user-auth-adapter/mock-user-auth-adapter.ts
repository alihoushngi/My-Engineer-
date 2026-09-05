import {
  isMockUserLoginEnabled,
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
const FORCED_ERROR_MESSAGE = "خطای آزمایشی ورود کاربر فعال است.";

export async function mockUserLoginWithPassword(input: {
  phone: string;
  password: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserLoginEnabled()) {
    return mutationFailed("ورود آزمایشی کاربر غیرفعال است.");
  }

  await wait(mockAuthConfig.mockUserLogin.delayMs);

  if (mockAuthConfig.mockUserLogin.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  const phoneOk = sameCredential(
    input.phone,
    mockAuthConfig.mockUserLogin.phone,
  );
  const passwordOk = sameCredential(
    input.password,
    mockAuthConfig.mockUserLogin.password,
  );

  if (!phoneOk || !passwordOk) {
    return mutationUnauthorized(INVALID_PASSWORD_MESSAGE);
  }

  return { ok: true };
}

export async function mockRequestUserLoginOtp(input: {
  phone: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserLoginEnabled()) {
    return mutationFailed("ورود آزمایشی کاربر غیرفعال است.");
  }

  await wait(mockAuthConfig.mockUserLogin.delayMs);

  if (mockAuthConfig.mockUserLogin.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (!sameCredential(input.phone, mockAuthConfig.mockUserLogin.phone)) {
    return mutationUnauthorized(INVALID_PASSWORD_MESSAGE);
  }

  return { ok: true };
}

export async function mockUserLoginWithOtp(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserLoginEnabled()) {
    return mutationFailed("ورود آزمایشی کاربر غیرفعال است.");
  }

  await wait(mockAuthConfig.mockUserLogin.delayMs);

  if (mockAuthConfig.mockUserLogin.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (!sameCredential(input.phone, mockAuthConfig.mockUserLogin.phone)) {
    return mutationUnauthorized(INVALID_PASSWORD_MESSAGE);
  }

  if (!sameCredential(input.otp, mockAuthConfig.mockUserLogin.otp)) {
    return mutationUnauthorized(INVALID_OTP_MESSAGE);
  }

  return { ok: true };
}
