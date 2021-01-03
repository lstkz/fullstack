export function warmestMonth(temps: number[]): number | null {
  // TRIM_START
  let maxTemp = -Infinity;
  let maxIndex: number | null = null;
  let multiple = false;
  for (let i = 0; i < temps.length; i++) {
    if (temps[i] > maxTemp) {
      maxTemp = temps[i];
      maxIndex = i + 1;
      multiple = false;
    } else if (temps[i] === maxTemp) {
      multiple = true;
    }
  }
  return multiple ? null : maxIndex;
  // TRIM_END
}
