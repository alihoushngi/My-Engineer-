/**
 * Engineer workspace mutations and client-safe catalog reads.
 * Session access lives in engineer-access-service.ts (server-only).
 */

import { env } from "@/lib/env/env";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";
import { mockCities, mockProvinces } from "@/lib/mock-data/mock-data";
import { logoutEngineer } from "@/services/engineer-auth-service/engineer-auth-service";
import { sendMessage } from "@/services/messaging-service/messaging-service";
import { type City, type Province } from "@/types/store/registration.types";

const WRITE_UNAVAILABLE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";

export type UpdateEngineerProfileRequest = {
  firstName: string;
  lastName: string;
  profession: string;
  about?: string;
};

export type UpdateEngineerSpecialtiesRequest = {
  specialties: readonly string[];
  software: readonly string[];
};

export type UpdateEngineerServiceAreaRequest = {
  provinceId: string;
  cityId: string;
  nearbyCityIds: readonly string[];
};

export type SendEngineerMessageRequest = {
  conversationId: string;
  body: string;
};

export type AddEngineerPortfolioItemRequest = {
  title: string;
  description?: string;
};

export async function updateEngineerProfile(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: UpdateEngineerProfileRequest,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function updateEngineerSpecialties(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: UpdateEngineerSpecialtiesRequest,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function updateEngineerServiceArea(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: UpdateEngineerServiceAreaRequest,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function sendEngineerMessage(
  request: SendEngineerMessageRequest,
): Promise<void> {
  await sendMessage(request);
}

export async function addEngineerPortfolioItem(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: AddEngineerPortfolioItemRequest,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function removeEngineerPortfolioItem(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: string,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function markEngineerNotificationRead(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _id: string,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
}

export async function signOutEngineer(): Promise<void> {
  await logoutEngineer();
}

export async function getEngineerLocationCatalog(): Promise<{
  provinces: readonly Province[];
  cities: readonly City[];
}> {
  if (!env.useMockData) {
    return { provinces: [], cities: [] };
  }

  return { provinces: mockProvinces, cities: mockCities };
}
