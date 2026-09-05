const ACCOUNT_MESSAGES = "/account/messages";
const ENGINEER_MESSAGES = "/engineer/messages";

export function isAccountConversationThreadPath(pathname: string): boolean {
  return isConversationThreadPath(pathname, ACCOUNT_MESSAGES);
}

export function isEngineerConversationThreadPath(pathname: string): boolean {
  return isConversationThreadPath(pathname, ENGINEER_MESSAGES);
}

function isConversationThreadPath(pathname: string, listPath: string): boolean {
  if (!pathname.startsWith(`${listPath}/`)) {
    return false;
  }

  const rest = pathname.slice(listPath.length + 1);

  return rest !== "" && rest !== "start" && !rest.includes("/");
}
