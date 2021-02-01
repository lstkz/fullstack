export function cycledIndex(arr: number[], idx: number): number {
  return arr[idx % arr.length];
}
