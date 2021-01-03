import { clamp } from '../src/main';

test.each([
  [0, 2, 5, 2],
  [10, 2, 5, 5],
  [3, 2, 5, 3],
  [-3, -2, 5, -2],
  [-3, 0, 0, 0],
  [1234, -100000, 100000, 1234],
  [-1234, -100000, 100000, -1234],
  [0, 0, 0, 0],
  [2, 1, 3, 2],
])('.clamp(%i, %i, %i)', (a, b, c, expected) => {
  expect(clamp(a, b, c)).toEqual(expected);
});
