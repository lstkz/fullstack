export function maxStreak(arr: number[]): number {
  // TRIM_START
  let max = 0;
  let current = 0;
  arr.forEach(score => {
    if (score) {
      current++;
      if (current > max) {
        max = current;
      }
    } else {
      current = 0;
    }
  });
  return max;
  // TRIM_END
}
