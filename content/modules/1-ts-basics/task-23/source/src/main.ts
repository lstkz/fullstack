// TRIM_START
function getAlmostGreatest(arr: number[]) {
  let max1 = -Infinity;
  let max2 = -Infinity;
  arr.forEach(n => {
    if (n > max1) {
      max2 = max1;
      max1 = n;
    } else if (n > max2) {
      max2 = n;
    }
  });
  return max2;
}
// TRIM_END
export function sumAlmostTwoGreatest(arr1: number[], arr2: number[]): number {
  // TRIM_START
  return getAlmostGreatest(arr1) + getAlmostGreatest(arr2);
  // TRIM_END
}
