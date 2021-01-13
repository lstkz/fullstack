export function lowestRounding(a: number, b: number): number {
  // TRIM_START
  for (let p = 6; p >= 0; p--) {
    const mul = 10 ** p;
    const roundedA = Math.round(a * mul);
    const roundedB = Math.round(b * mul);
    if (roundedA == roundedB) {
      return p;
    }
  }
  return -1;
  // TRIM_END
}
