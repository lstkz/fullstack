import crypto from 'crypto';
import fs from 'fs';
import Path from 'path';
import prettier from 'prettier';
import { floorNumber } from './task-12/source/src/main';
import { middleNumber } from './task-1/source/src/main';
import { roundCurrency } from './task-2/source/src/main';
import { warmestMonth } from './task-3/source/src/main';
import { roundSum } from './task-4/source/src/main';
import { maxStreak } from './task-5/source/src/main';

const target = process.argv[2];

function randomInt() {
  return crypto.randomBytes(4).readUInt32BE(0);
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

function ensureDir(file: string) {
  const dirname = Path.dirname(file);
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
