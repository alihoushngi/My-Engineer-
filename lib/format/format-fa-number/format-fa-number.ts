const faNumber = new Intl.NumberFormat("fa-IR");

export function formatFaNumber(value: number): string {
  return faNumber.format(value);
}
