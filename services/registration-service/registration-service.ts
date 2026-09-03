/**
 * Registration service — API integration layer.
 *
 * API CONTRACT REQUIRED for all operations.
 * No documented endpoints exist yet. All functions are stubs that throw
 * until the backend contract is established.
 *
 * Do not invent fake success responses. The UI will show an error/integration
 * state when these throw.
 */

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

const API_NOT_AVAILABLE_MESSAGE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";

/**
 * Sends an OTP to the provided phone number.
 * API CONTRACT REQUIRED — endpoint, payload, and error codes are not yet defined.
 */
export async function sendOtp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SendOtpRequest,
): Promise<void> {
  throw new Error(API_NOT_AVAILABLE_MESSAGE);
}

/**
 * Verifies the OTP code.
 * API CONTRACT REQUIRED — endpoint, payload, and error codes are not yet defined.
 */
export async function verifyOtp(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: VerifyOtpRequest,
): Promise<void> {
  throw new Error(API_NOT_AVAILABLE_MESSAGE);
}

/**
 * Persists the service area selection for the current registration session.
 * API CONTRACT REQUIRED — endpoint, payload, and session model are not yet defined.
 */
export async function saveServiceArea(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SaveServiceAreaRequest,
): Promise<void> {
  throw new Error(API_NOT_AVAILABLE_MESSAGE);
}
