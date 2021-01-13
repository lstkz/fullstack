export function roundSum(
  arr1: number[],
  arr2: number[]
): [number, number] | null {
  // TRIM_START
  let ret: [number, number] | null = null;
  let multiple = false;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      const sum = arr1[i] + arr2[j];
      if (sum > 100 && sum % 100 == 0) {
        if (ret) {
          multiple = true;
        } else {
          ret = [i, j];
        }
      }
    }
  }
  return multiple ? null : ret;
  // TRIM_END
}
