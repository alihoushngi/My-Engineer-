import { toLatinDigits } from "@/lib/utils/to-latin-digits/to-latin-digits";

const PERSIAN_DIGIT_START = 0x06f0;

export function toPersianDigits(value: string): string {
  let result = "";

  for (const char of value) {
    if (char >= "0" && char <= "9") {
      result += String.fromCharCode(
        PERSIAN_DIGIT_START + (char.charCodeAt(0) - 48),
      );
      continue;
    }

    result += char;
  }

  return result;
}

export function maskIranianMobile(phone: string): string {
  const digits = toLatinDigits(phone.trim());

  if (!/^09\d{9}$/.test(digits)) {
    return "۰۹***";
  }

  return toPersianDigits(`${digits.slice(0, 4)}***${digits.slice(7)}`);
}
