export function floorNumber(heights: number[], h: number): number {
  // TRIM_START
  let sum = 0;
  for (let i = 0; i < heights.length; i++) {
    sum += heights[i];
    if (sum > h) {
      return i;
    }
  }
  if (sum === h) {
    return heights.length - 1;
  }
  return -1;
  // TRIM_END
}

// TRIM_START
let testCases: any[] = [];
const random = (n: number, max: number) => {
  const crypto = require('crypto');
  const randomInt = () => crypto.randomBytes(4).readUInt32BE(0);

  const input = Array<number>(n)
    .fill(0)
    .map(() => (randomInt() % max) + 1);
  const sum = input.reduce((a, b) => a + b);
  const h = randomInt() % sum;

  const testInput = [input, h, floorNumber(input, h)];
  testCases.push({
    in: testInput,
    out: floorNumber(input, h),
  });
};
const addFixed = (input: [number[], number]) => {
  testCases.push({
    in: input,
    out: floorNumber(...input),
  });
};
random(10, 500);
random(20, 500);
random(100, 500);
random(500, 500);
random(1000, 500);
testCases.forEach(testCase => {});
// TRIM_END
