export function floorNumber(heights: number[], h: number): number {
  // TRIM_START
  let sum = 0;
  for (let i = 0; i < heights.length; i++) {
    sum += heights[i];
    if (sum > h) {
      return i;
    }
  }
  if (sum === h) {
    return heights.length - 1;
  }
  return -1;
  // TRIM_END
}
