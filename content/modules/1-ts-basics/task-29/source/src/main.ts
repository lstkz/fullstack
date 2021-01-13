export function gambler(maxBet: number, amount: number): number {
  // TRIM_START
  let ret = 0;
  let bet = 1;
  while (amount > bet && bet * 2 < maxBet) {
    amount -= bet;
    ret++;
    bet *= 2;
  }
  ret += Math.ceil(amount / maxBet);
  return ret;
  // TRIM_END
}
