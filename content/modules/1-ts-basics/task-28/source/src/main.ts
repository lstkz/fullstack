export function longestIncreasing(arr: number[]): number {
  // TRIM_START
  let maxLength = 0;
  let currentLength = 0;
  let current = -Infinity;
  arr.forEach(n => {
    if (n > current) {
      currentLength++;
    } else {
      currentLength = 1;
    }
    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
    current = n;
  });
  return maxLength;
  // TRIM_END
}
