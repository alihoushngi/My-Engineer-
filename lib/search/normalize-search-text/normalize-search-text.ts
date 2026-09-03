export function normalizeSearchText(value: string): string {
  return value
    .trim()
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("fa");
}
