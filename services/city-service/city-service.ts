/**
 * City service — province/city catalog.
 *
 * API CONTRACT REQUIRED — no endpoint exists for the province/city tree.
 * Do not invent URLs or sample Iran datasets as production data.
 */

import { type City, type Province } from "@/types/store/registration.types";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";
import { env } from "@/lib/env/env";
import { canUseMocks } from "@/lib/auth/can-use-mocks/can-use-mocks";
import { mockCities, mockProvinces } from "@/lib/mock-data/mock-data";

const API_NOT_AVAILABLE_MESSAGE =
  "فهرست استان‌ها و شهرها پس از اتصال سرویس در دسترس خواهد بود.";

function canUseMockCityCatalog(): boolean {
  return env.useMockData || (canUseMocks() && env.publicMockRegisterEnabled);
}

export async function getProvinces(): Promise<readonly Province[]> {
  if (canUseMockCityCatalog()) return mockProvinces;
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}

export async function getCitiesByProvince(
  _provinceId: string,
): Promise<readonly City[]> {
  if (canUseMockCityCatalog()) {
    return mockCities.filter((city) => city.provinceId === _provinceId);
  }
  throwApiUnavailable(API_NOT_AVAILABLE_MESSAGE);
}
