export function calcPages(itemCount: number, pageSize: number): number {
  // TRIM_START
  return Math.ceil(itemCount / pageSize);
  // TRIM_END
}
