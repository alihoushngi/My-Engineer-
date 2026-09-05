/**
 * Customer authentication service.
 *
 * UI calls these functions. Credential comparison lives in the mock adapter.
 * Real login remains unavailable when mock user login is disabled.
 */

import { throwIfMutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  completeUserRegisterAction,
  loginUserWithOtpAction,
  loginUserWithPasswordAction,
  logoutUserAction,
  requestUserLoginOtpAction,
  requestUserRegisterOtpAction,
  verifyUserRegisterOtpAction,
} from "@/services/user-auth-service/user-auth-actions";

export async function requestUserLoginOtp(phone: string): Promise<void> {
  throwIfMutationFailed(await requestUserLoginOtpAction({ phone }));
}

export async function loginUserWithOtp(
  phone: string,
  otp: string,
): Promise<void> {
  throwIfMutationFailed(await loginUserWithOtpAction({ phone, otp }));
}

export async function loginUserWithPassword(
  phone: string,
  password: string,
): Promise<void> {
  throwIfMutationFailed(await loginUserWithPasswordAction({ phone, password }));
}

export async function requestUserRegisterOtp(phone: string): Promise<void> {
  throwIfMutationFailed(await requestUserRegisterOtpAction({ phone }));
}

export async function verifyUserRegisterOtp(
  phone: string,
  otp: string,
): Promise<void> {
  throwIfMutationFailed(await verifyUserRegisterOtpAction({ phone, otp }));
}

export async function completeUserRegister(input: {
  phone: string;
  otp: string;
  displayName: string;
  password: string;
}): Promise<void> {
  throwIfMutationFailed(await completeUserRegisterAction(input));
}

export async function logoutUser(): Promise<void> {
  throwIfMutationFailed(await logoutUserAction());
}
