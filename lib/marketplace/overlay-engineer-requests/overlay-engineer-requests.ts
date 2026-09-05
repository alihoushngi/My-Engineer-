import { toEngineerRequest } from "@/lib/marketplace/request-projections/request-projections";
import { filterRequestsForParty } from "@/lib/marketplace/request-selectors/request-selectors";
import { type EngineerWorkspace } from "@/types/store/engineer.types";
import { type ServiceRequest } from "@/types/store/service-request.types";

export function overlayEngineerRequests(
  workspace: EngineerWorkspace,
  extras: readonly ServiceRequest[],
): EngineerWorkspace {
  const extraViews = filterRequestsForParty(extras, {
    expertId: workspace.account.publicExpertId,
  }).map(toEngineerRequest);
  const existing = new Set(workspace.requests.map((item) => item.id));
  const prepended = extraViews.filter((item) => !existing.has(item.id));

  if (prepended.length === 0) {
    return workspace;
  }

  return {
    ...workspace,
    requests: [...prepended, ...workspace.requests],
  };
}
