import {
  apiErrorCodeFromStatus,
  type ApiErrorCode,
} from "@/lib/api/api-error-code/api-error-code";

export type ApiValidationError = {
  field?: string;
  message: string;
};

type ApiErrorInput = {
  status: number;
  message: string;
  code?: ApiErrorCode;
  payload?: unknown;
  validationErrors?: readonly ApiValidationError[];
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly payload: unknown;
  readonly validationErrors: readonly ApiValidationError[];

  constructor({
    status,
    message,
    code,
    payload = null,
    validationErrors = [],
  }: ApiErrorInput) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.payload = payload;
    this.validationErrors = validationErrors;
    this.code =
      code ?? apiErrorCodeFromStatus(status, validationErrors.length > 0);
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

export async function apiErrorFromResponse(
  response: Response,
): Promise<ApiError> {
  const payload = await readResponsePayload(response);
  const validationErrors = readValidationErrors(payload);

  return new ApiError({
    status: response.status,
    message: readErrorMessage(payload, response.status),
    payload,
    validationErrors,
  });
}

export function apiErrorFromFetchFailure(
  error: unknown,
  timedOut: boolean,
  abortedByCaller: boolean,
): ApiError {
  if (abortedByCaller) {
    return new ApiError({
      status: 0,
      code: "aborted",
      message: "Request was aborted",
    });
  }

  if (timedOut || isTimeoutFailure(error)) {
    return new ApiError({
      status: 0,
      code: "timeout",
      message: "Request timed out",
    });
  }

  return new ApiError({
    status: 0,
    code: "network",
    message: "Network request failed",
  });
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text();

  if (text.trim() === "") {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

function readErrorMessage(payload: unknown, status: number): string {
  if (typeof payload === "string" && payload.trim() !== "") {
    return payload;
  }

  if (isRecord(payload) && typeof payload.message === "string") {
    return payload.message;
  }

  return `Request failed with status ${status}`;
}

function readValidationErrors(payload: unknown): ApiValidationError[] {
  if (!isRecord(payload)) {
    return [];
  }

  const errors = payload.errors ?? payload.validationErrors;

  if (Array.isArray(errors)) {
    return errors.flatMap((item) => {
      if (typeof item === "string") {
        return [{ message: item }];
      }

      if (!isRecord(item) || typeof item.message !== "string") {
        return [];
      }

      return [
        {
          message: item.message,
          ...(typeof item.field === "string" ? { field: item.field } : {}),
        },
      ];
    });
  }

  if (isRecord(errors)) {
    return Object.entries(errors).flatMap(([field, value]) => {
      if (typeof value === "string") {
        return [{ field, message: value }];
      }

      if (Array.isArray(value)) {
        return value
          .filter((entry): entry is string => typeof entry === "string")
          .map((message) => ({ field, message }));
      }

      return [];
    });
  }

  return [];
}

function isTimeoutFailure(error: unknown): boolean {
  return error instanceof DOMException && error.name === "TimeoutError";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
