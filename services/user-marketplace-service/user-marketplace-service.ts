/**
 * Customer marketplace mutations. UI calls these functions.
 * Mock overlays are session cookies for visual testing, not production persistence.
 */

import {
  mutationFailed,
  throwIfMutationFailed,
} from "@/lib/auth/service-mutation-result/service-mutation-result";
import {
  createServiceRequestAction,
  toggleSavedExpertAction,
} from "@/services/user-marketplace-service/user-marketplace-actions";
import { type CreateServiceRequestInput } from "@/types/store/service-request.types";

export async function toggleSavedExpert(
  expertId: string,
): Promise<{ saved: boolean }> {
  const result = await toggleSavedExpertAction({ expertId });
  throwIfMutationFailed(result);
  return { saved: result.saved === true };
}

export async function createServiceRequest(
  input: CreateServiceRequestInput,
): Promise<string> {
  const result = await createServiceRequestAction(input);
  throwIfMutationFailed(result);

  const requestId = result.requestId;

  if (!requestId) {
    throwIfMutationFailed(mutationFailed("شناسه درخواست ساخته نشد."));
    throw new Error("شناسه درخواست ساخته نشد.");
  }

  return requestId;
}
