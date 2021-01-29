export function lightsGame(
  lightCount: number,
  toggleButtons: number[][],
  actions: number[]
): number[] {
  const state: number[] = [];
  for (let i = 0; i < lightCount; i++) {
    state.push(0);
  }
  actions.forEach(n => {
    const toggle = toggleButtons[n];
    toggle.forEach((bit, i) => {
      state[i] ^= bit;
    });
  });
  return state;
}
