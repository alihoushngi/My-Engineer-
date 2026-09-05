import { toLatinDigits } from "@/lib/utils/to-latin-digits/to-latin-digits";
import {
  isMockRegisterEnabled,
  mockAuthConfig,
} from "@/config/mock-auth.config/mock-auth.config";
import { wait } from "@/lib/auth/wait/wait";
import {
  mutationFailed,
  mutationUnavailable,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const FORCED_ERROR_MESSAGE = "خطای آزمایشی ثبت‌نام فعال است.";
const INVALID_OTP_MESSAGE = "کد واردشده صحیح نیست.";

export async function mockRegistrationStep(): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return mutationUnavailable(
      "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.",
    );
  }

  await wait(mockAuthConfig.mockRegister.delayMs);

  if (mockAuthConfig.mockRegister.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  return { ok: true };
}

export async function mockVerifyRegistrationOtp(input: {
  code: string;
}): Promise<ServiceMutationResult> {
  if (!isMockRegisterEnabled()) {
    return mutationUnavailable(
      "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.",
    );
  }

  await wait(mockAuthConfig.mockRegister.delayMs);

  if (mockAuthConfig.mockRegister.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (
    toLatinDigits(input.code.trim()) !==
    toLatinDigits(mockAuthConfig.mockRegister.otp)
  ) {
    return mutationFailed(INVALID_OTP_MESSAGE);
  }

  return { ok: true };
}
