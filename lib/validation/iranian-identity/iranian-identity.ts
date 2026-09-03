import { toLatinDigits } from "@/lib/utils/to-latin-digits/to-latin-digits";

/**
 * Validates a 10-digit Iranian national ID using the documented checksum algorithm.
 * SOURCE: legacy auth.js client validation + LEGACY-AUDIT.md
 * Rejects all-same-digit codes and codes not matching the checksum.
 */
export function validateIranianNationalId(value: string): boolean {
  const normalized = toLatinDigits(value.trim());

  if (!/^\d{10}$/.test(normalized)) {
    return false;
  }

  // Reject all identical digits (e.g. 0000000000, 1111111111)
  if (/^(.)\1{9}$/.test(normalized)) {
    return false;
  }

  const digits = normalized.split("").map(Number) as [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
  ];
  const check = digits[9];
  let sum = 0;

  for (let i = 0; i < 9; i++) {
    sum += (digits[i] as number) * (10 - i);
  }

  const remainder = sum % 11;
  const expectedCheck = remainder < 2 ? remainder : 11 - remainder;

  return check === expectedCheck;
}

/**
 * Returns true if value looks like a valid Iranian mobile number.
 * Pattern: starts with 09, exactly 11 digits.
 * SOURCE: legacy client validation in auth.js
 */
export function validateIranianMobile(value: string): boolean {
  const normalized = toLatinDigits(value.trim());

  return /^09\d{9}$/.test(normalized);
}
