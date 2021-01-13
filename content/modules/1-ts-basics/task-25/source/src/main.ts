export function xmasTree(n: number): string[] {
  // TRIM_START
  const ret: string[] = [];
  for (let i = 0; i < n; i++) {
    let affix = '';
    for (let j = 0; j < n - i - 1; j++) {
      affix += '0';
    }
    let ones = '1';
    for (let j = 0; j < i; j++) {
      ones += '11';
    }
    ret.push(affix + ones + affix);
  }
  return ret;
  // TRIM_END
}
