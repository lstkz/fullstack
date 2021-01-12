export function lightsGame(
  lightCount: number,
  toggleButtons: number[][],
  actions: number[]
): number[] {
  // TRIM_START
  const state = Array<number>(lightCount).fill(0);
  actions.forEach(n => {
    const toggle = toggleButtons[n];
    toggle.forEach((bit, i) => {
      state[i] ^= bit;
    });
  });
  return state;
  // TRIM_END
}
