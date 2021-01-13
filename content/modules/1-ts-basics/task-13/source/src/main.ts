export function awesomeTriples(arr: number[]): number[][] {
  // TRIM_START
  const ret: number[][] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      for (let k = j + 1; k < arr.length; k++) {
        if (arr[i] ** 2 + arr[j] ** 2 < arr[k] ** 2) {
          ret.push([i, j, k]);
        }
      }
    }
  }
  return ret;
  // TRIM_END
}
