export function numberSequence(start: number, end: number): number[] {
  // TRIM_START
  const ret: number[] = [];
  while (start !== end) {
    ret.push(start);
    if (start < end) {
      start++;
    } else {
      start--;
    }
  }
  ret.push(end);
  return ret;
  // TRIM_END
}
