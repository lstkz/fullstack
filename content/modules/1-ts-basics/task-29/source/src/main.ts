export function gambler(maxBet: number, amount: number): number {
  // TRIM_START
  let ret = 0;
  let bet = 1;
  while (bet <= amount && bet <= maxBet) {
    amount -= bet;
    bet *= 2;
    ret++;
  }
  ret += Math.ceil(amount / maxBet);
  return ret;
  // TRIM_END
}
