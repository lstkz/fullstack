export function cycledIndex(arr: number[], idx: number): number {
  // TRIM_START
  return arr[idx % arr.length];
  // TRIM_END
}
