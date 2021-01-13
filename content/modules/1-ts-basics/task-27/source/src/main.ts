export function numberDistance(a: number, b: number): number {
  // TRIM_START
  if (a > b) {
    return a - b;
  }
  return b - a;
  // TRIM_END
}
