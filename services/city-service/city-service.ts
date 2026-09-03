/**
 * City service — province/city catalog.
 *
 * API CONTRACT REQUIRED — no endpoint exists for the province/city tree.
 * Functions are stubs that communicate integration status clearly.
 */

import { type City, type Province } from "@/types/store/registration.types";

const API_NOT_AVAILABLE_MESSAGE =
  "فهرست استان‌ها و شهرها پس از اتصال سرویس در دسترس خواهد بود.";

/**
 * Returns the full list of provinces.
 * API CONTRACT REQUIRED.
 */
export async function getProvinces(): Promise<readonly Province[]> {
  throw new Error(API_NOT_AVAILABLE_MESSAGE);
}

/**
 * Returns cities for a given province ID.
 * API CONTRACT REQUIRED.
 */
export async function getCitiesByProvince(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _provinceId: string,
): Promise<readonly City[]> {
  throw new Error(API_NOT_AVAILABLE_MESSAGE);
}
