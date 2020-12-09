import { middleNumber } from '../src/main';

test.each([
  [1, 2, 3, 2],
  [3, 2, 1, 2],
  [2, 3, 1, 2],
  [1, 3, 2, 2],
  [1, 1, 1, 1],
  [1, 1, 2, 1],
  [2, 1, 2, 2],
  [1e7, 1e8, 1e9, 1e8],
  [1e8, 1e9, 1e7, 1e8],
  [-10, -100, -1, -10],
  [-1, -100, -10, -10],
  [-2, -1, 0, -1],
  [0, 0, 0, 0],
])('.middleNumber(%i, %i, %i)', (a, b, c, expected) => {
  expect(middleNumber(a, b, c)).toEqual(expected);
});
