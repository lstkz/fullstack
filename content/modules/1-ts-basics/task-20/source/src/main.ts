export function sumTwoGreatest(arr1: number[], arr2: number[]): number {
  // TRIM_START
  let max1 = -Infinity;
  let max2 = -Infinity;
  for (let n of arr1) {
    if (n > max1) {
      max1 = n;
    }
  }
  for (let n of arr2) {
    if (n > max2) {
      max2 = n;
    }
  }
  return max1 + max2;
  // TRIM_END
}
