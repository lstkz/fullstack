export function equalArrays(arr1: number[], arr2: number[]): boolean {
  // TRIM_START
  if (arr1.length != arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
  // TRIM_END
}
