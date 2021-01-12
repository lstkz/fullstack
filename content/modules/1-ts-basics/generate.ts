import crypto from 'crypto';
import fs from 'fs';
import Path from 'path';
import prettier from 'prettier';
import { floorNumber } from './task-12/source/src/main';

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
    if (data.length > 15) {
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
    fs.writeFileSync(outFilePath, serializedIn);
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
