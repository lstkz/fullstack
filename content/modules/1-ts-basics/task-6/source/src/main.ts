export function clamp(n: number, min: number, max: number): number {
  // TRIM_START
  if (n < min) {
    return min;
  }
  if (n > max) {
    return max;
  }
  return n;
  // TRIM_END
}
