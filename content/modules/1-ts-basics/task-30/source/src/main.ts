export function mixture(a: number, b: number, c: number): number {
  // TRIM_START
  return Math.min(Math.floor(a / 2), Math.floor(b / 5), Math.floor(c / 3));
  // TRIM_END
}
