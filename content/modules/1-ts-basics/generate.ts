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
import { triangle } from './task-14/source/src/main';
import { banknotes } from './task-15/source/src/main';
import { equalCards } from './task-16/source/src/main';
import { revertSubArray } from './task-17/source/src/main';
import { calcPages } from './task-18/source/src/main';
import { targetArraySum } from './task-19/source/src/main';
import { sumTwoGreatest } from './task-20/source/src/main';
import { equalArrays } from './task-21/source/src/main';
import { lowestRounding } from './task-22/source/src/main';
import { sumAlmostTwoGreatest } from './task-23/source/src/main';
import { strangeWar } from './task-24/source/src/main';
import { xmasTree } from './task-25/source/src/main';
import { numberSequence } from './task-26/source/src/main';
import { numberDistance } from './task-27/source/src/main';
import { longestIncreasing } from './task-28/source/src/main';
import { gambler } from './task-29/source/src/main';
import { mixture } from './task-30/source/src/main';

const target = process.argv[2];

function randomInt() {
  return crypto.randomBytes(4).readUInt32BE(0);
}

function randomPositiveMax(max = 1e9 + 1) {
  let ret = randomInt() % max;
  return ret;
}

function randomNaturalMax(max = 1e9 + 1) {
  let ret = randomInt() % max;
  if (ret == 0) {
    ret = 1;
  }
  return ret;
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
  14: {
    fnName: 'triangle',
    inputArgs: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' },
      { name: 'c', type: 'number' },
    ],
    fn: () => {
      addFixed(triangle)
        .create(3, 1, 2)
        .create(5, 5, 4)
        .create(1, 10, 1)
        .create(1, 1, 1)
        .create(1, 2, 3)
        .create(1, 3, 2)
        .create(3, 2, 1)
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax());
    },
  },
  15: {
    fnName: 'banknotes',
    inputArgs: [{ name: 'amount', type: 'number' }],
    fn: () => {
      addFixed(banknotes)
        .create(8)
        .create(3)
        .create(10)
        .create(101)
        .create(30)
        .create(265)
        .create(99)
        .create(1e9)
        .create(randomNaturalMax())
        .create(randomNaturalMax())
        .create(randomNaturalMax())
        .create(randomNaturalMax())
        .create(randomNaturalMax())
        .create(randomNaturalMax());
    },
  },
  16: {
    fnName: 'equalCards',
    inputArgs: [
      { name: 'pair1', type: '[string, string]' },
      { name: 'pair2', type: '[string, string]' },
    ],
    fn: () => {
      addFixed(equalCards)
        .create(['2d', '3d'], ['2d', '3d'])
        .create(['2d', '3d'], ['3d', '2d'])
        .create(['2d', '3c'], ['3d', '2d'])
        .create(['Ad', 'Ac'], ['Ad', 'Kd'])
        .create(['5d', '5c'], ['5c', '5d'])
        .create(['5d', '5c'], ['5c', '6d'])
        .create(['6d', '5c'], ['5c', '6d'])
        .create(['5c', '6d'], ['5c', '6d'])
        .create(['5c', '6d'], ['6d', '2d']);
    },
  },
  17: {
    fnName: 'revertSubArray',
    inputArgs: [
      { name: 'arr', type: 'number[]' },
      { name: 'start', type: 'number' },
      { name: 'end', type: 'number' },
    ],
    fn: () => {
      addFixed(revertSubArray)
        .create([1, 2, 3, 4, 5], 0, 1)
        .create([1, 2, 3, 4, 5], 0, 3)
        .create([1, 2, 3, 4, 5], 1, 3)
        .create([1, 2, 3, 4, 5], 0, 4);

      const create = (n: number, start: number, end: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => randomMax(1e4));

        const testInput = [input, start, end] as const;
        testCases.push({
          in: testInput,
          out: revertSubArray(...testInput),
        });
      };
      create(2, 0, 1);
      create(50, 3, 40);
      create(50, 39, 40);
      create(1000, 0, 999);
      create(10000, 0, 9999);
      create(10000, 1, 5000);
    },
  },
  18: {
    fnName: 'calcPages',
    inputArgs: [
      { name: 'arr', type: 'number[]' },
      { name: 'start', type: 'number' },
      { name: 'end', type: 'number' },
    ],
    fn: () => {
      addFixed(calcPages)
        .create(10, 5)
        .create(11, 5)
        .create(1, 100)
        .create(0, 100)
        .create(1000, 100)
        .create(1543, 13)
        .create(7541469, 13)
        .create(7541469, 1)
        .create(0, 1)
        .create(randomNaturalMax(), randomPositiveMax(1000))
        .create(randomNaturalMax(), randomPositiveMax(1000))
        .create(randomNaturalMax(), randomPositiveMax(1000))
        .create(randomNaturalMax(), randomPositiveMax(1000));
    },
  },
  19: {
    fnName: 'targetArraySum',
    inputArgs: [
      { name: 'arr', type: 'number[]' },
      { name: 'sum', type: 'number' },
    ],
    fn: () => {
      addFixed(targetArraySum)
        .create([1, 2, 3], 3)
        .create([1, 2, 3, 4, 5, 6], 14)
        .create([10, 20, 30], 10)
        .create([10, 10, 20, 1], 21);

      const create = (n: number, start: number, end: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => randomPositiveMax(1e5));
        let sum = input.slice(start, end).reduce((a, b) => a + b);
        const testInput = [input, sum] as const;
        testCases.push({
          in: testInput,
          out: targetArraySum(...testInput),
        });
      };
      create(30, 20, 30);
      create(50, 1, 49);
      create(50, 0, 50);
      create(100, 0, 100);
      create(500, 200, 300);
      create(1000, 450, 560);
      create(1000, 7, 8);
      create(1000, 1, 999);
      create(1000, 0, 1000);
    },
  },
  20: {
    fnName: 'sumTwoGreatest',
    inputArgs: [
      { name: 'arr1', type: 'number[]' },
      { name: 'arr2', type: 'number[]' },
    ],
    fn: () => {
      addFixed(sumTwoGreatest)
        .create([11, 2], [7])
        .create([10, 10, 11], [11, 10])
        .create([10, 10, 11], [11, 10])
        .create([1, 2, 3], [3, 2, 1])
        .create([-100, -101, -102], [-10, -20, -30]);

      const create = (n: number, m: number) => {
        const input1 = Array<number>(n)
          .fill(0)
          .map(() => randomMax());
        const input2 = Array<number>(m)
          .fill(0)
          .map(() => randomPositiveMax(1e5));
        const testInput = [input1, input2] as const;
        testCases.push({
          in: testInput,
          out: sumTwoGreatest(...testInput),
        });
      };
      create(1, 100);
      create(100, 1);
      create(1000, 1237);
      create(2541, 7841);
      create(5000, 2);
      create(1e5, 1e5);
    },
  },
  21: {
    fnName: 'equalArrays',
    inputArgs: [
      { name: 'arr1', type: 'number[]' },
      { name: 'arr2', type: 'number[]' },
    ],
    fn: () => {
      addFixed(equalArrays)
        .create([1, 2], [1, 2])
        .create([1, 2, 3], [1, 2])
        .create([1, 2], [2, 2])
        .create([], []);

      const create = (
        n: number,
        modify?: (arr: number[], n: number) => number[]
      ) => {
        const input1 = Array<number>(n)
          .fill(0)
          .map(() => randomMax());
        let input2 = [...input1];
        if (modify) {
          input2 = modify(input2, n);
        }
        const testInput = [input1, input2] as const;
        testCases.push({
          in: testInput,
          out: equalArrays(...testInput),
        });
      };
      create(50);
      create(50, (arr, n) => {
        arr[randomInt() % n] = randomMax();
        return arr;
      });
      create(50, (arr, n) => {
        arr.push(randomMax());
        return arr;
      });
      create(500);
      create(500, arr => {
        arr.push(randomMax());
        return arr;
      });
      create(1000);
      create(1000, arr => {
        arr.pop();
        return arr;
      });
      create(1000, arr => {
        arr.reverse();
        return arr;
      });
    },
  },
  22: {
    fnName: 'lowestRounding',
    inputArgs: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' },
    ],
    fn: () => {
      addFixed(lowestRounding)
        .create(0.34, 0.341)
        .create(1.2345, 1.2)
        .create(1.2345, 1.23)
        .create(1.111111, 1.122222)
        .create(1.251111, 1.222222)
        .create(1.2, 2.2)
        .create(1.2, 2.2)
        .create(1.134521, 2.134521)
        .create(2.134522, 2.134521)
        .create(2.134552, 2.134555);
    },
  },
  23: {
    fnName: 'sumAlmostTwoGreatest',
    inputArgs: [
      { name: 'arr1', type: 'number[]' },
      { name: 'arr2', type: 'number[]' },
    ],
    fn: () => {
      addFixed(sumAlmostTwoGreatest)
        .create([1, 2, 3], [10, 20, 30])
        .create([5, 5, 1], [1, 2])
        .create([3, 3, 3, 3], [1, 1, 1, 1])
        .create([1, 2, 3, 4], [4, 3, 2, 1])
        .create([-100, -101, -102], [-10, -20, -30]);

      const create = (n: number, m: number) => {
        const input1 = Array<number>(n)
          .fill(0)
          .map(() => randomMax());
        const input2 = Array<number>(m)
          .fill(0)
          .map(() => randomMax());
        const testInput = [input1, input2] as const;
        testCases.push({
          in: testInput,
          out: sumAlmostTwoGreatest(...testInput),
        });
      };
      create(2, 100);
      create(100, 2);
      create(1000, 1237);
      create(2541, 7841);
      create(5000, 3);
      create(1e5, 1e5);
    },
  },
  24: {
    fnName: 'strangeWar',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      addFixed(strangeWar)
        .create([1, 2, 3])
        .create([4, 1, 2, 3])
        .create([1, 1])
        .create([4])
        .create([1, 1, 1, 3, 3, 3])
        .create([1, 1, 1, 3, 3]);

      const create = (n: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => randomMax());
        const testInput = [input] as const;
        testCases.push({
          in: testInput,
          out: strangeWar(...testInput),
        });
      };
      create(20);
      create(50);
      create(100);
      create(1000);
      create(5000);
      create(10000);
    },
  },
  25: {
    fnName: 'xmasTree',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      addFixed(xmasTree)
        .create(1)
        .create(2)
        .create(3)
        .create(4)
        .create(10)
        .create(15)
        .create(32)
        .create(49)
        .create(50);
    },
  },
  26: {
    fnName: 'numberSequence',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      addFixed(numberSequence)
        .create(1, 3)
        .create(3, 1)
        .create(0, 1)
        .create(-5, -3)
        .create(-2, -5)
        .create(-10, 14)
        .create(-14, 21)
        .create(-100, 0)
        .create(0, 1000)
        .create(456, 1000)
        .create(-1000, 1)
        .create(-1000, 1000);
    },
  },
  27: {
    fnName: 'numberDistance',
    inputArgs: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' },
    ],
    fn: () => {
      addFixed(numberDistance)
        .create(0, 6)
        .create(1, 6)
        .create(-1, 6)
        .create(-3, -5)
        .create(-5, -3)
        .create(3, 3)
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax())
        .create(randomMax(), randomMax());
    },
  },
  28: {
    fnName: 'longestIncreasing',
    inputArgs: [{ name: 'arr', type: 'number[]' }],
    fn: () => {
      addFixed(longestIncreasing)
        .create([1, 2, 3, 1, 2])
        .create([1, 1, 1])
        .create([1, 5, 10, 15])
        .create([1, 5, 10, 9, 15])
        .create([10, -6, -5, 0, 2, 1]);

      const create = (n: number) => {
        const input = Array<number>(n)
          .fill(0)
          .map(() => randomMax());

        const testInput = [input] as const;
        testCases.push({
          in: testInput,
          out: longestIncreasing(...testInput),
        });
      };
      create(20);
      create(30);
      create(100);
      create(1000);
      const input1 = Array<number>(1000)
        .fill(0)
        .map((_, i) => i * 2);
      testCases.push({
        in: [input1],
        out: longestIncreasing(input1),
      });
      const input2 = Array<number>(1000)
        .fill(0)
        .map((_, i) => i * 2 - 1e6);
      testCases.push({
        in: [input1],
        out: longestIncreasing(input2),
      });
    },
  },
  29: {
    fnName: 'gambler',
    inputArgs: [
      { name: 'maxBet', type: 'number' },
      { name: 'amount', type: 'number' },
    ],
    fn: () => {
      addFixed(gambler)
        .create(100, 7)
        .create(100, 8)
        .create(100, 13)
        .create(2, 7)
        .create(30, 30)
        .create(5, 22)
        .create(1e5, 1e5)
        .create(1e5 + 1, 1e5)
        .create(1e9, 1e9)
        .create(1, 1e9)
        .create(2, 1e9)
        .create(13, 1e9)
        .create(1441, 1e9)
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax());
    },
  },
  30: {
    fnName: 'mixture',
    inputArgs: [
      { name: 'a', type: 'number' },
      { name: 'b', type: 'number' },
      { name: 'c', type: 'number' },
    ],
    fn: () => {
      addFixed(mixture)
        .create(2, 5, 3)
        .create(100, 100, 4)
        .create(4, 10, 6)
        .create(6, 15, 12)
        .create(6, 15, 0)
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), randomNaturalMax())
        .create(0, randomNaturalMax(), randomNaturalMax())
        .create(randomNaturalMax(), 0, randomNaturalMax())
        .create(randomNaturalMax(), randomNaturalMax(), 0);
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
