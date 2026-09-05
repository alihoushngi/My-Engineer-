import { cookies } from "next/headers";
import {
  MOCK_CREATED_REQUESTS_COOKIE,
  MOCK_SESSION_COOKIE_OPTIONS,
  MOCK_USER_SAVED_COOKIE,
} from "@/lib/auth/mock-session-cookies/mock-session-cookies";
import {
  parseCreatedRequestsCookie,
  serializeCreatedRequestsCookie,
} from "@/lib/marketplace/created-requests-cookie/created-requests-cookie";
import {
  parseSavedExpertIds,
  serializeSavedExpertIds,
} from "@/lib/marketplace/request-selectors/request-selectors";
import { DEFAULT_SAVED_EXPERT_IDS } from "@/lib/mock-data/user-workspace-mock-data";
import { type ServiceRequest } from "@/types/store/service-request.types";

export async function readSavedExpertIds(): Promise<readonly string[]> {
  const store = await cookies();
  return parseSavedExpertIds(
    store.get(MOCK_USER_SAVED_COOKIE)?.value,
    DEFAULT_SAVED_EXPERT_IDS,
  );
}

export async function writeSavedExpertIds(
  ids: readonly string[],
): Promise<void> {
  const store = await cookies();
  store.set({
    name: MOCK_USER_SAVED_COOKIE,
    value: serializeSavedExpertIds(ids),
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });
}

export async function readCreatedRequests(): Promise<
  readonly ServiceRequest[]
> {
  const store = await cookies();
  return parseCreatedRequestsCookie(
    store.get(MOCK_CREATED_REQUESTS_COOKIE)?.value,
  );
}

export async function writeCreatedRequests(
  requests: readonly ServiceRequest[],
): Promise<void> {
  const store = await cookies();
  store.set({
    name: MOCK_CREATED_REQUESTS_COOKIE,
    value: serializeCreatedRequestsCookie(requests),
    ...MOCK_SESSION_COOKIE_OPTIONS,
  });
}
