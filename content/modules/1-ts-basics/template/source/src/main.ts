export function middleNumber(a: number, b: number, c: number): number {
  // TRIM_START
  if (a >= Math.min(b, c) && a <= Math.max(b, c)) {
    return a;
  }
  if (b >= Math.min(a, c) && b <= Math.max(a, c)) {
    return b;
  }
  return c;
  // TRIM_END
}
