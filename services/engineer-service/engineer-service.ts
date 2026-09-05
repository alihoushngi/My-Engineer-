/**
 * Engineer workspace service.
 *
 * Reads: mock display data when NEXT_PUBLIC_USE_MOCK_DATA is enabled.
 * Mutations: API CONTRACT REQUIRED — throw typed unavailable errors.
 * Do not treat display data as an authenticated session.
 */

import { env } from "@/lib/env/env";
import { throwApiUnavailable } from "@/lib/api/throw-api-unavailable/throw-api-unavailable";
import { isEngineerAccessGranted } from "@/lib/engineer/access/access";
import { getMockEngineerWorkspace } from "@/lib/mock-data/build-engineer-workspace/build-engineer-workspace";
import { mockCities, mockProvinces } from "@/lib/mock-data/mock-data";
import {
  type EngineerAccessResult,
  type EngineerConversation,
  type EngineerMessage,
  type EngineerNotification,
  type EngineerRequest,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";
import { type City, type Province } from "@/types/store/registration.types";

const WRITE_UNAVAILABLE =
  "این عملیات هنوز از طریق سرور در دسترس نیست. پس از آماده‌شدن API فعال می‌شود.";
const AUTH_UNAVAILABLE = "خروج از حساب پس از اتصال سرویس نشست فعال می‌شود.";

export async function getEngineerAccess(): Promise<EngineerAccessResult> {
  if (env.useMockData) {
    return {
      kind: "visual_review",
      workspace: getMockEngineerWorkspace(),
    };
  }

  return { kind: "unavailable" };
}

export async function getEngineerWorkspace(): Promise<EngineerWorkspace | null> {
  const access = await getEngineerAccess();

  if (!isEngineerAccessGranted(access)) {
    return null;
  }

  return access.workspace;
}

export async function getEngineerRequest(
  id: string,
): Promise<EngineerRequest | null> {
  const workspace = await getEngineerWorkspace();
  return workspace?.requests.find((request) => request.id === id) ?? null;
}

export async function getEngineerConversation(
  id: string,
): Promise<EngineerConversation | null> {
  const workspace = await getEngineerWorkspace();
  return (
    workspace?.conversations.find((conversation) => conversation.id === id) ??
    null
  );
}

export async function getEngineerMessages(
  conversationId: string,
): Promise<readonly EngineerMessage[]> {
  const workspace = await getEngineerWorkspace();
  return workspace?.messagesByConversationId[conversationId] ?? [];
}

export async function getEngineerNotifications(): Promise<
  readonly EngineerNotification[]
> {
  const workspace = await getEngineerWorkspace();
  return workspace?.notifications ?? [];
}

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: SendEngineerMessageRequest,
): Promise<void> {
  throwApiUnavailable(WRITE_UNAVAILABLE);
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
  throwApiUnavailable(AUTH_UNAVAILABLE);
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
