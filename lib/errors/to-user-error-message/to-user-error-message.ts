const REQUEST_FAILED_PREFIX = /^Request failed with status/i;
const PERSIAN_LETTER = /[\u0600-\u06FF]/;

export function toUserErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) {
    return fallback;
  }

  const message = error.message.trim();

  if (message === "" || REQUEST_FAILED_PREFIX.test(message)) {
    return fallback;
  }

  if (PERSIAN_LETTER.test(message)) {
    return message;
  }

  return fallback;
}
