export function inaccurateNumbersEqual(
  a: number,
  b: number,
  p: number
): boolean {
  // TRIM_START
  const mul = 10 ** p;
  a = Math.round(a * mul) / mul;
  b = Math.round(b * mul) / mul;
  return a === b;
  // TRIM_END
}
