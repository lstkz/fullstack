export function intervals(arr: number[]): number[][] {
  // TRIM_START
  const ret: number[][] = [];
  let current: number[] = [];
  arr.forEach(n => {
    if (current[current.length - 1] + 1 === n) {
      current.push(n);
    } else {
      current = [n];
      ret.push(current);
    }
  });
  return ret;
  // TRIM_END
}

// TRIM_START
const random = (n: number, max: number) => {
  const crypto = require('crypto');
  const randomInt = () => crypto.randomBytes(4).readUInt32BE(0);

  const input = Array<number>(n).fill(randomInt() % max);
  for (let i = 1; i < input.length; i++) {
    if (randomInt() % 3 === 0) {
      input[i] = input[i - 1] + 1;
    } else {
      input[i] = randomInt() % max;
    }
  }

  const testInput = [input, intervals(input)];

  console.log(JSON.stringify(testInput) + ',');
};
// random(10, 5);
// random(20, 10);
// random(30, 100);
// random(30, 20000);
// random(200, 20000);
// random(500, 20);
// random(500, 20000);
// TRIM_END
