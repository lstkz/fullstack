export function intervals(arr: number[]): number[][] {
  // TRIM_START
  const ret: number[][] = [];
  let current: number[] = [];
  arr.forEach(n => {
    if (current[current.length - 1] + 1 === n) {
      current.push(n);
    } else {
      current = [n];
      ret.push(current);
    }
  });
  return ret;
  // TRIM_END
}
