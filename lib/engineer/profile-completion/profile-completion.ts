import {
  engineerPanelPaths,
  profileCompletionLabels,
} from "@/config/engineer-panel.config/engineer-panel.config";
import {
  type EngineerWorkspace,
  type ProfileCompletion,
  type ProfileCompletionItem,
  type ProfileCompletionItemId,
} from "@/types/store/engineer.types";

const COMPLETION_ORDER: readonly ProfileCompletionItemId[] = [
  "avatar",
  "personalInfo",
  "specialties",
  "resume",
  "education",
  "organization",
  "serviceAreas",
  "portfolio",
  "credentials",
];

const COMPLETION_HREF: Record<ProfileCompletionItemId, string> = {
  avatar: engineerPanelPaths.profile,
  personalInfo: engineerPanelPaths.profile,
  specialties: engineerPanelPaths.services,
  resume: engineerPanelPaths.profile,
  education: engineerPanelPaths.credentials,
  organization: engineerPanelPaths.credentials,
  serviceAreas: engineerPanelPaths.serviceAreas,
  portfolio: engineerPanelPaths.portfolio,
  credentials: engineerPanelPaths.credentials,
};

/**
 * Frontend-only completion score.
 *
 * Derivation: nine registration/profile areas already represented in the
 * product. Each item is complete when the corresponding workspace field is
 * present. Percent = round(completed / 9 * 100). This is not a server value.
 */
export function deriveProfileCompletion(
  workspace: EngineerWorkspace,
): ProfileCompletion {
  const items: ProfileCompletionItem[] = COMPLETION_ORDER.map((id) => ({
    id,
    label: profileCompletionLabels[id] ?? id,
    complete: isCompletionItemComplete(id, workspace),
    href: COMPLETION_HREF[id],
  }));

  const completedCount = items.filter((item) => item.complete).length;

  return {
    completedCount,
    totalCount: items.length,
    percent: Math.round((completedCount / items.length) * 100),
    items,
  };
}

function isCompletionItemComplete(
  id: ProfileCompletionItemId,
  workspace: EngineerWorkspace,
): boolean {
  const { profile, serviceArea, portfolio, credentials } = workspace;

  switch (id) {
    case "avatar":
      return Boolean(profile.avatarSrc);
    case "personalInfo":
      return profile.firstName.trim() !== "" && profile.lastName.trim() !== "";
    case "specialties":
      return profile.specialties.length > 0;
    case "resume":
      return Boolean(profile.history && profile.history.trim() !== "");
    case "education":
      return profile.education.length > 0;
    case "organization":
      return Boolean(profile.organizationMembership);
    case "serviceAreas":
      return Boolean(serviceArea.cityId);
    case "portfolio":
      return portfolio.length > 0;
    case "credentials":
      return credentials.some((item) => item.hasDocument);
  }
}
