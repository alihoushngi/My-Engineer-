const PERSIAN_DIGIT_START = 0x06f0;
const ARABIC_DIGIT_START = 0x0660;
const LATIN_DIGIT_START = 0x30;

function digitize(code: number, start: number): string {
  return String.fromCharCode(LATIN_DIGIT_START + (code - start));
}

export function toLatinDigits(value: string): string {
  let result = "";

  for (const char of value) {
    const code = char.codePointAt(0);

    if (code === undefined) {
      continue;
    }

    if (code >= PERSIAN_DIGIT_START && code <= PERSIAN_DIGIT_START + 9) {
      result += digitize(code, PERSIAN_DIGIT_START);
      continue;
    }

    if (code >= ARABIC_DIGIT_START && code <= ARABIC_DIGIT_START + 9) {
      result += digitize(code, ARABIC_DIGIT_START);
      continue;
    }

    result += char;
  }

  return result;
}

export const LOCAL_DIGIT_PATTERN = "^[0-9\u06F0-\u06F9\u0660-\u0669]+$";
