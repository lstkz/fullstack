export function banknotes(amount: number): number {
  // TRIM_START
  let ret = 0;
  [100, 50, 20, 10, 5, 1].forEach(n => {
    ret += Math.floor(amount / n);
    amount %= n;
  });
  return ret;
  // TRIM_END
}
