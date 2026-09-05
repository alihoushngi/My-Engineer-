/**
 * Engineer authentication service.
 *
 * UI calls these functions. Credential comparison lives in the mock adapter.
 * Real login remains unavailable when mock login is disabled.
 */

import { throwIfMutationFailed } from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  loginEngineerWithOtpAction,
  loginEngineerWithPasswordAction,
  logoutEngineerAction,
  requestEngineerLoginOtpAction,
} from "@/services/engineer-auth-service/engineer-auth-actions";

export async function requestEngineerLoginOtp(phone: string): Promise<void> {
  throwIfMutationFailed(await requestEngineerLoginOtpAction({ phone }));
}

export async function loginEngineerWithOtp(
  phone: string,
  otp: string,
): Promise<void> {
  throwIfMutationFailed(await loginEngineerWithOtpAction({ phone, otp }));
}

export async function loginEngineerWithPassword(
  phone: string,
  password: string,
): Promise<void> {
  throwIfMutationFailed(
    await loginEngineerWithPasswordAction({ phone, password }),
  );
}

export async function logoutEngineer(): Promise<void> {
  throwIfMutationFailed(await logoutEngineerAction());
}
