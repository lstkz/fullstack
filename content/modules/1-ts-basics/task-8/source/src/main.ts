export function inaccurateNumbersEqual(
  a: number,
  b: number,
  p: number
): boolean {
  const precision = 10 ** p;
  a = Math.round(a * precision) / precision;
  b = Math.round(b * precision) / precision;
  return a == b;
}
