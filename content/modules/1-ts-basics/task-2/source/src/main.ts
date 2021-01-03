export function roundCurrency(amount: number): number {
  // TRIM_START
  return Math.round(amount * 100) / 100;
  // TRIM_END
}
