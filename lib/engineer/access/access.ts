import {
  type EngineerAccessGranted,
  type EngineerAccessResult,
  type EngineerShellData,
  type EngineerWorkspace,
} from "@/types/store/engineer.types";

export function isEngineerAccessGranted(
  access: EngineerAccessResult,
): access is EngineerAccessGranted {
  return (
    access.kind === "visual_review" ||
    access.kind === "registration_in_progress" ||
    access.kind === "pending_review" ||
    access.kind === "active"
  );
}

export function toEngineerShellData(
  access: EngineerAccessGranted,
): EngineerShellData {
  const { account, notifications, conversations, requests } = access.workspace;

  return {
    accessKind: access.kind,
    displayName: account.displayName,
    profession: account.profession,
    avatarSrc: account.avatarSrc,
    publicProfileHref: account.publicExpertId
      ? `/experts/${account.publicExpertId}`
      : undefined,
    unreadNotificationCount: notifications.filter((item) => !item.isRead)
      .length,
    unreadMessageCount: conversations.reduce(
      (total, conversation) => total + conversation.unreadCount,
      0,
    ),
    newRequestCount: requests.filter((request) => request.isNew).length,
    verificationStatus: account.verificationStatus,
    accessStatus: account.accessStatus,
    continueRegistrationPath: access.continueRegistrationPath,
  };
}

export function getPublicProfileHref(
  workspace: EngineerWorkspace,
): `/experts/${string}` | undefined {
  const id = workspace.account.publicExpertId.trim();

  if (id === "") {
    return undefined;
  }

  return `/experts/${id}`;
}
