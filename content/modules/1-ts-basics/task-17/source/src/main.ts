export function revertSubArray(
  arr: number[],
  start: number,
  end: number
): number[] {
  // TRIM_START
  const part1 = arr.slice(0, start);
  const part2 = arr.slice(start, end + 1);
  const part3 = arr.slice(end + 1);
  part2.reverse();
  return [...part1, ...part2, ...part3];
  // TRIM_END
}
