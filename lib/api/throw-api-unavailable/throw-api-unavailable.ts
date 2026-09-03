import { ApiError } from "@/lib/api/api-error/api-error";

/**
 * Typed failure when a domain operation has no documented backend contract.
 * Do not invent a URL or a successful payload in place of this.
 */
export function throwApiUnavailable(message: string): never {
  throw new ApiError({
    status: 0,
    code: "unavailable",
    message,
  });
}
