import { roundCurrency } from '../src/main';

test.each([
  [1.101, 1.1],
  [10.59999, 10.6],
  [4.123, 4.12],
  [4.44499, 4.44],
  [1000, 1000],
  [651.33333, 651.33],
  [51.9999, 52],
  [0, 0],
  [1.000001, 1],
])('.roundCurrency(%d)', (a, expected) => {
  expect(roundCurrency(a)).toEqual(expected);
});
