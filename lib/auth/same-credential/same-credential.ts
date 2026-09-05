import { toLatinDigits } from "@/lib/utils/to-latin-digits/to-latin-digits";

export function sameCredential(actual: string, expected: string): boolean {
  return toLatinDigits(actual.trim()) === toLatinDigits(expected.trim());
}
