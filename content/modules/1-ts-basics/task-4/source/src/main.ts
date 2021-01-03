export function roundSum(
  arr1: number[],
  arr2: number[]
): [number, number] | null {
  // TRIM_START
  let ret: [number, number] | null = null;
  let multiple = false;
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      const n1 = arr1[i];
      const n2 = arr2[j];
      if ((n1 + n2) % 100 == 0) {
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
