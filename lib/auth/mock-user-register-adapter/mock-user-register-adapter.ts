import {
  isMockUserRegisterEnabled,
  mockAuthConfig,
} from "@/config/mock-auth.config/mock-auth.config";
import { wait } from "@/lib/auth/wait/wait";
import { sameCredential } from "@/lib/auth/same-credential/same-credential";
import { validateIranianMobile } from "@/lib/validation/iranian-identity/iranian-identity";
import {
  mutationFailed,
  mutationUnauthorized,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import { type ServiceMutationResult } from "@/types/store/engineer-auth.types";

const INVALID_PHONE_MESSAGE = "شماره موبایل معتبر نیست.";
const INVALID_OTP_MESSAGE = "کد واردشده صحیح نیست.";
const FORCED_ERROR_MESSAGE = "خطای آزمایشی ثبت‌نام کاربر فعال است.";
const ENGINEER_PHONE_MESSAGE =
  "این شماره برای حساب متخصص رزرو شده است. از ورود مهندس استفاده کنید.";

export async function mockRequestUserRegisterOtp(input: {
  phone: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserRegisterEnabled()) {
    return mutationFailed("ثبت‌نام آزمایشی کاربر غیرفعال است.");
  }

  await wait(mockAuthConfig.mockUserRegister.delayMs);

  if (mockAuthConfig.mockUserRegister.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (!validateIranianMobile(input.phone)) {
    return mutationUnauthorized(INVALID_PHONE_MESSAGE);
  }

  if (sameCredential(input.phone, mockAuthConfig.mockLogin.phone)) {
    return mutationUnauthorized(ENGINEER_PHONE_MESSAGE);
  }

  return { ok: true };
}

export async function mockVerifyUserRegisterOtp(input: {
  phone: string;
  otp: string;
}): Promise<ServiceMutationResult> {
  if (!isMockUserRegisterEnabled()) {
    return mutationFailed("ثبت‌نام آزمایشی کاربر غیرفعال است.");
  }

  await wait(mockAuthConfig.mockUserRegister.delayMs);

  if (mockAuthConfig.mockUserRegister.forceError) {
    return mutationFailed(FORCED_ERROR_MESSAGE);
  }

  if (!validateIranianMobile(input.phone)) {
    return mutationUnauthorized(INVALID_PHONE_MESSAGE);
  }

  if (sameCredential(input.phone, mockAuthConfig.mockLogin.phone)) {
    return mutationUnauthorized(ENGINEER_PHONE_MESSAGE);
  }

  if (!sameCredential(input.otp, mockAuthConfig.mockUserRegister.otp)) {
    return mutationUnauthorized(INVALID_OTP_MESSAGE);
  }

  return { ok: true };
}

export async function mockCompleteUserRegister(input: {
  phone: string;
  otp: string;
  displayName: string;
  password: string;
}): Promise<ServiceMutationResult> {
  const otpResult = await mockVerifyUserRegisterOtp({
    phone: input.phone,
    otp: input.otp,
  });

  if (!otpResult.ok) {
    return otpResult;
  }

  if (input.displayName.trim() === "") {
    return mutationFailed("نام را وارد کنید.");
  }

  if (input.password.trim().length < 8) {
    return mutationFailed("رمز عبور باید حداقل ۸ نویسه باشد.");
  }

  return { ok: true };
}
