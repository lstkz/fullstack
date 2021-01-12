import crypto from 'crypto';
import fs from 'fs';
import Path from 'path';
import prettier from 'prettier';
import { middleNumber } from './task-1/source/src/main';
import { roundCurrency } from './task-2/source/src/main';
import { warmestMonth } from './task-3/source/src/main';
import { roundSum } from './task-4/source/src/main';
import { maxStreak } from './task-5/source/src/main';
import { clamp } from './task-6/source/src/main';
import { cycledIndex } from './task-7/source/src/main';
import { inaccurateNumbersEqual } from './task-8/source/src/main';
import { missingNumber } from './task-9/source/src/main';
import { lightsGame } from './task-10/source/src/main';
import { intervals } from './task-11/source/src/main';
import { floorNumber } from './task-12/source/src/main';
import { awesomeTriples } from './task-13/source/src/main';

const target = process.argv[2];

function randomInt() {
  return crypto.randomBytes(4).readUInt32BE(0);
}

function randomMax(max = 1e9 + 1) {
  let ret = randomInt() % max;
  if (randomInt() % 2) {
    ret *= -1;
  }
  return ret;
}

const testCases: Array<{
  in: readonly any[];
  out: any;
}> = [];

function addFixed(fn: (...args: any[]) => any) {
  const create = (...input: any[]) => {
    testCases.push({
      in: input,
      out: fn(...input),
    });
    return { create };
  };
  return { create };
}

const generatorMap = {
  1: {
    fnName: 'middleNumber',
    inputArgs: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' },
      { name: 'c', type: 'number' },
    ],
    fn: () => {
      addFixed(middleNumber)
        .create(1, 2, 3)
        .create(3, 2, 1)
        .create(2, 3, 1)
        .create(1, 3, 2)
        .create(1, 1, 1)
        .create(1, 1, 2)
        .create(2, 1, 2)
        .create(1e7, 1e8, 1e9)
        .create(1e8, 1e9, 1e7)
        .create(-10, -100, -1)
        .create(-1, -100, -10)
        .create(-2, -1, 0)
        .create(0, 0, 0);
    },
  },
  2: {
    fnName: 'roundCurrency',
    inputArgs: [{ name: 'amount', type: 'number' }],
    fn: () => {
      addFixed(roundCurrency)
        .create(1.101)
        .create(10.59999)
        .create(4.123)
        .create(4.44499)
        .create(1000)
        .create(651.3333)
        .create(51.9999)
        .create(0)
        .create(1.000001);
    },
  },
  3: {
    fnName: 'warmestMonth',
    inputArgs: [{ name: 'temps', type: 'number[]' }],
    fn: () => {
      addFixed(warmestMonth)
        .create([1, 1, 2, 4, 5, 6, 10, 9, 9, 1, 2, 3])
        .create([1, 1, 2, 4, 5, 6, 9, 9, 9, 1, 2, 3])
        .create([1, 1, 2, 4, 5, 21, 20, 20, 9, 1, 2, 3])
        .create([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20])
        .create([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 1])
        .create([20, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
        .create([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
        .create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        .create([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0])
        .create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    },
  },
  4: {
    fnName: 'roundSum',
    inputArgs: [
      { name: 'arr1', type: 'number[]' },
      { name: 'arr2', type: 'number[]' },
    ],
    fn: () => {
      addFixed(roundSum)
        .create([60, 40], [10, 20, 30, 40])
        .create([50, 40], [150])
        .create([1, 2, 3, 4], [1, 2, 3])
        .create([60, 40], [40, 60])
        .create([201, 100, 301], [50, 1, 2, 0])
        .create([5], [5])
        .create(
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
        )
        .create([98], [1])
        .create([100000, 1, 2, 3, 4], [1, 100000, 2, 3, 4])
        .create([1, 100000, 2, 3, 4], [100000, 1, 2, 3, 4])
        .create([1, 2, 3], [1, 2, 7])
        .create([9], [1]);
    },
  },
  5: {
    fnName: 'maxStreak',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      addFixed(maxStreak)
        .create([1, 1, 0])
        .create([1, 0, 1, 0, 1])
        .create([0, 0])
        .create([1, 1, 0, 1, 1, 1])
        .create([1, 1, 0, 1, 1, 0, 1])
        .create([])
        .create([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        .create([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
        .create([0, 1, 1])
        .create([1, 0, 1, 1])
        .create([1, 1, 0, 1, 1])
        .create([1, 1, 1, 0]);
    },
  },
  6: {
    fnName: 'clamp',
    inputArgs: [
      { name: 'n', type: 'number' },
      { name: 'min', type: 'number' },
      { name: 'max', type: 'number' },
    ],
    fn: () => {
      addFixed(clamp)
        .create(0, 2, 5)
        .create(10, 2, 5)
        .create(3, 2, 5)
        .create(-3, -2, 5)
        .create(-3, 0, 0)
        .create(1234, -100000, 100000)
        .create(-1234, -100000, 100000)
        .create(0, 0, 0)
        .create(2, 1, 3)
        .create(randomMax(), randomMax(), randomMax())
        .create(randomMax(), randomMax(), randomMax())
        .create(randomMax(), randomMax(), randomMax())
        .create(randomMax(), randomMax(), randomMax())
        .create(randomMax(), randomMax(), randomMax());
    },
  },
  7: {
    fnName: 'cycledIndex',
    inputArgs: [
      { name: 'arr', type: 'number[]' },
      { name: 'idx', type: 'number' },
    ],
    fn: () => {
      addFixed(cycledIndex)
        .create([10, 11, 12, 13, 14], 4)
        .create([10, 11, 12, 13, 14], 0)
        .create([10, 11, 12, 13, 14], 5)
        .create([1, 2, 3], 9)
        .create([1, 2, 3], 100)
        .create([1, 2, 3], 1000000)
        .create([7], 50)
        .create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1_000_000_000)
        .create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 999_999_999)
        .create([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7);

      const create = (n: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => randomMax());
        const idx = randomInt() % 1e9;
        const testInput = [input, idx] as const;
        testCases.push({
          in: testInput,
          out: cycledIndex(...testInput),
        });
      };
      create(20);
      create(40);
      create(70);
      create(100);
    },
  },
  8: {
    fnName: 'inaccurateNumbersEqual',
    inputArgs: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' },
      { name: 'p', type: 'number' },
    ],
    fn: () => {
      addFixed(inaccurateNumbersEqual)
        .create(1.1, 1.2, 0)
        .create(1.1, 1.2, 1)
        .create(1.12, 1.13, 1)
        .create(1.12, 1.15, 1)
        .create(0.99, 0.989999, 2)
        .create(0.123456, 0.123455, 5)
        .create(0.123456, 0.12345, 5)
        .create(0.12345678, 0.12345678, 7)
        .create(1.12345671, 1.1234567, 7);
    },
  },
  9: {
    fnName: 'missingNumber',
    inputArgs: [
      { name: 'arr', type: 'Array<number | null>' },
      { name: 'sum', type: 'number' },
    ],
    fn: () => {
      addFixed(missingNumber)
        .create([1, 1, 2, null], 6)
        .create([1, 1, null, 10, 2, 2], 26)
        .create([5, null], 10)
        .create([null, 1, 2, 3, 2, 3], 12)
        .create([null, 1000, 1000, 999, 999, 1], 4000)
        .create([null, 1000, 1000, 999, 999, 998, 998, 997], 7988);

      const create = (n: number) => {
        const arr = [];
        const set = new Set<number>();
        let sum = 0;
        for (let i = 0; i < n / 2; i++) {
          let n: number = null!;
          do {
            n = (randomInt() % 1000) + 1;
          } while (set.has(n));
          set.add(n);
          arr.push(n);
          arr.push(n);
          sum += 2 * n;
        }
        const idx = randomInt() % arr.length;
        arr[idx] = null;
        arr.sort(() => randomMax());
        const testInput = [arr, sum] as const;
        testCases.push({
          in: testInput,
          out: missingNumber(...testInput),
        });
      };
      create(20);
      create(50);
      create(80);
      create(100);
    },
  },
  10: {
    fnName: 'lightsGame',
    inputArgs: [
      { name: 'lightCount', type: 'number' },
      { name: 'toggleButtons', type: 'number[][]' },
      { name: 'actions', type: 'number[]' },
    ],
    fn: () => {
      addFixed(lightsGame)
        .create(
          2,
          [
            [1, 1],
            [0, 0],
          ],
          [0]
        )
        .create(
          2,
          [
            [1, 1],
            [0, 0],
          ],
          [0, 0]
        )
        .create(
          2,
          [
            [0, 1],
            [1, 0],
            [1, 1],
            [1, 0],
          ],
          [1, 0, 1, 0, 0, 0, 0]
        )
        .create(
          2,
          [
            [1, 0],
            [0, 1],
          ],
          [0, 1, 1]
        )
        .create(3, [[1, 0, 1]], [0]);

      const create = (
        lightCount: number,
        buttonCount: number,
        actionCount: number
      ) => {
        const toggleButtons = Array<number[]>(buttonCount)
          .fill([])
          .map(() =>
            Array<number>(lightCount)
              .fill(0)
              .map(() => randomInt() % 2)
          );
        const actions = Array<number>(actionCount)
          .fill(0)
          .map(() => randomInt() % buttonCount);

        const testInput = [lightCount, toggleButtons, actions] as const;
        testCases.push({
          in: testInput,
          out: lightsGame(...testInput),
        });
      };
      create(10, 2, 3);
      create(10, 5, 4);
      create(3, 25, 20);
      create(20, 20, 20);
      create(20, 50, 50);
      create(20, 50, 50);
    },
  },
  11: {
    fnName: 'intervals',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      addFixed(intervals)
        .create([1, 2, 3, 4, 6])
        .create([1, 3, 5])
        .create([1, 2, 3])
        .create([1, 1, 3, 3, 4]);

      const create = (n: number, max: number) => {
        const arr = Array<number>(n).fill(randomInt() % max);
        for (let i = 1; i < arr.length; i++) {
          if (randomInt() % 3 === 0) {
            arr[i] = arr[i - 1] + 1;
          } else {
            arr[i] = randomInt() % max;
          }
        }
        const testInput = [arr] as const;

        testCases.push({
          in: testInput,
          out: intervals(...testInput),
        });
      };
      create(10, 5);
      create(20, 10);
      create(30, 100);
      create(30, 20000);
      create(200, 20000);
      create(500, 20);
      create(500, 20000);
    },
  },
  12: {
    fnName: 'floorNumber',
    inputArgs: [
      { name: 'heights', type: 'number[]' },
      { name: 'h', type: 'number' },
    ],
    fn: () => {
      const create = (n: number, max: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => (randomInt() % max) + 1);
        const sum = input.reduce((a, b) => a + b);
        const h = randomInt() % sum;

        const testInput = [input, h] as const;
        testCases.push({
          in: testInput,
          out: floorNumber(...testInput),
        });
      };
      addFixed(floorNumber)
        .create([5, 10, 10], 0)
        .create([5, 10, 10], 4)
        .create([5, 10, 10], 5)
        .create([5, 10, 10], 15)
        .create([5, 10, 10], 25)
        .create([5, 10, 10], 50)
        .create([5, 10, 10], 24)
        .create([5, 10, 10], 26)
        .create([1, 2, 2, 3, 3, 5], 10);
      create(10, 500);
      create(20, 500);
      create(100, 500);
      create(500, 10000);
      create(1000, 10000);
      create(1000, 10000);
      create(1000, 10000);
    },
  },
  13: {
    fnName: 'awesomeTriples',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      const create = (n: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => randomMax(1e4));

        const testInput = [input] as const;
        testCases.push({
          in: testInput,
          out: awesomeTriples(...testInput),
        });
      };
      addFixed(awesomeTriples)
        .create([1, 2, 3])
        .create([1, 2, 3, 3])
        .create([10, 10, 20, 30]);
      create(10);
      create(20);
      create(50);
      create(100);
      create(100);
    },
  },
};

if (!generatorMap[target]) {
  throw new Error(`Invalid target ${target}`);
}
const { fnName, inputArgs, fn } = generatorMap[target];

fn();

const testsDir = Path.join(__dirname, `task-${target}/source/__tests__`);
const testsDataDir = Path.join(testsDir, `data`);
const mainTestPath = Path.join(testsDir, 'main.test.ts');

let content = `import { ${fnName} } from '../src/main';`;

function ensureDir(dirname: string) {
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname);
  }
}

function isLongIO(data: any): boolean {
  if (!data) {
    return false;
  }
  if (Array.isArray(data)) {
    if (data.length > 20) {
      return true;
    }
    return data.some(isLongIO);
  }
  if (typeof data === 'object') {
    return Object.keys(data).some(key => isLongIO(data[key]));
  }
  return false;
}

testCases.forEach((testCase, i) => {
  const nr = i + 1;
  const serializedIn = JSON.stringify(testCase.in, null, 2);
  let body = '';
  if (isLongIO(testCase.in)) {
    ensureDir(testsDataDir);
    const inFileName = `${nr}.in.json`;
    const inFilePath = Path.join(testsDataDir, inFileName);
    fs.writeFileSync(inFilePath, serializedIn);
    body += `const args = require('./data/${inFileName}');\n`;
    inputArgs.forEach((arg, i) => {
      body += `const ${arg.name}: ${arg.type} = args[${i}];\n`;
    });
    body += `expect(${fnName}(${inputArgs.map(x => x.name).join(', ')}))`;
  } else {
    body += `expect(${fnName}(${serializedIn.substr(
      1,
      serializedIn.length - 2
    )}))`;
  }
  const serializedOut = JSON.stringify(testCase.out, null, 2);
  if (isLongIO(testCase.out)) {
    ensureDir(testsDataDir);
    const outFileName = `${nr}.out.json`;
    const outFilePath = Path.join(testsDataDir, outFileName);
    fs.writeFileSync(outFilePath, serializedOut);
    body += `.toEqual(require('./data/${outFileName}'));`;
  } else {
    body += `.toEqual(${serializedOut});`;
  }
  content += `\n\nit('test ${nr}', () => {
    ${body}
})`;
});

fs.writeFileSync(
  mainTestPath,
  prettier.format(content, {
    singleQuote: true,
    parser: 'typescript',
  })
);
