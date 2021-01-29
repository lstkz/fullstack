export function missingNumber(arr: Array<number | null>, sum: number): number {
  let currentSum = 0;
  arr.forEach(n => {
    if (n) {
      currentSum += n;
    }
  });
  return sum - currentSum;
}
