export function weirdWar(arr: number[]): number {
  // TRIM_START
  arr.sort((a, b) => a - b);
  return arr[Math.floor(arr.length / 2)];
  // TRIM_END
}
