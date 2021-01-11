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

// TRIM_START
const random = (n: number, m: number, a: number) => {
  const crypto = require('crypto');
  const randomInt = () => crypto.randomBytes(4).readUInt32BE(0);
  const toggleButtons = Array<number[]>(m)
    .fill([])
    .map(() =>
      Array<number>(n)
        .fill(0)
        .map(() => randomInt() % 2)
    );
  const actions = Array<number>(a)
    .fill(0)
    .map(() => randomInt() % m);

  const input = [n, toggleButtons, actions] as const;

  const testInput = [...input, lightsGame(...input)];

  console.log(JSON.stringify(testInput) + ',');
};
// random(2, 4, 3);
// random(2, 4, 5);
// random(2, 4, 7);
// random(2, 5, 7);
// random(5, 2, 3);
// random(10, 2, 3);
// random(10, 5, 4);
// random(3, 25, 20);
// random(20, 20, 20);
// random(20, 50, 50);
// TRIM_END
