export function inaccurateNumbersEqual(
  a: number,
  b: number,
  p: number
): boolean {
  // TRIM_START
  const precision = 10 ** p;
  a = Math.round(a * precision) / precision;
  b = Math.round(b * precision) / precision;
  return a == b;
  // TRIM_END
}
