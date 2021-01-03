import { inaccurateNumbersEqual } from '../src/main';

test.each([
  [1.1, 1.2, 0, true],
  [1.1, 1.2, 1, false],
  [1.12, 1.13, 1, true],
  [1.12, 1.15, 1, false],
  [0.99, 0.989999, 2, true],
  [0.123456, 0.123455, 5, true],
  [0.123456, 0.12345, 5, false],
  [0.12345678, 0.12345678, 7, true],
  [1.12345671, 1.1234567, 7, true],
])('.inaccurateNumbersEqual(%p, %p, %p)', (a, b, c, expected) => {
  expect(inaccurateNumbersEqual(a, b, c)).toEqual(expected);
});
