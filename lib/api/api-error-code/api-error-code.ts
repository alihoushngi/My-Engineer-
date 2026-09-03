export type ApiErrorCode =
  | "unconfigured"
  | "unavailable"
  | "network"
  | "timeout"
  | "aborted"
  | "validation"
  | "unauthorized"
  | "forbidden"
  | "not_found"
  | "conflict"
  | "server"
  | "unknown";

export function apiErrorCodeFromStatus(
  status: number,
  hasValidationErrors: boolean,
): ApiErrorCode {
  if (hasValidationErrors || status === 400 || status === 422) {
    return "validation";
  }

  if (status === 401) {
    return "unauthorized";
  }

  if (status === 403) {
    return "forbidden";
  }

  if (status === 404) {
    return "not_found";
  }

  if (status === 408 || status === 504) {
    return "timeout";
  }

  if (status === 409) {
    return "conflict";
  }

  if (status >= 500) {
    return "server";
  }

  return "unknown";
}
