import { missingNumber } from '../src/main';

test.each([
  [[1, 1, 2, null], 6, 2],
  [[1, 1, null, 10, 2, 2], 26, 10],
  [[5, null], 10, 5],
  [[null, 1, 2, 3, 2, 3], 12, 1],
  [[null, 1000, 1000, 999, 999, 1], 4000, 1],
  [[null, 1000, 1000, 999, 999, 998, 998, 997], 7988, 997],
])('.missingNumber(%p, %p)', (a, b, expected) => {
  expect(missingNumber(a, b)).toEqual(expected);
});
