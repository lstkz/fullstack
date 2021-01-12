export function targetArraySum(arr: number[], sum: number): number[] {
  // TRIM_START
  const prefixSums = [0];
  for (let i = 0; i < arr.length; i++) {
    prefixSums.push(arr[i] + prefixSums[i]);
  }

  for (let i = 0; i < prefixSums.length; i++) {
    for (let j = i + 1; j < prefixSums.length; j++) {
      if (prefixSums[j] - prefixSums[i] == sum) {
        return arr.slice(i, j);
      }
    }
  }
  return [];
  // TRIM_END
}
