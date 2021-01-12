export function triangle(a: number, b: number, c: number): boolean {
  // TRIM_START
  return a + b > c && a + c > b && b + c > a;
  // TRIM_END
}
