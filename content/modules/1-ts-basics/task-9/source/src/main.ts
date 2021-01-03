export function missingNumber(arr: Array<number | null>, sum: number): number {
  // TRIM_START
  let currentSum = 0;
  arr.forEach(n => {
    if (n) {
      currentSum += n;
    }
  });
  return sum - currentSum;
  // TRIM_END
}
