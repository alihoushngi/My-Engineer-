/**
 * City service — province/city catalog.
 *
 * API CONTRACT REQUIRED — no endpoint exists for the province/city tree.
 * Do not invent URLs or sample Iran datasets as production data.
 */

import { type City, type Province } from "@/types/store/registration.types";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";

const API_NOT_AVAILABLE_MESSAGE =
  "فهرست استان‌ها و شهرها پس از اتصال سرویس در دسترس خواهد بود.";

export async function getProvinces(): Promise<readonly Province[]> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function getCitiesByProvince(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _provinceId: string,
): Promise<readonly City[]> {
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}
