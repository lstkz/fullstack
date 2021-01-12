import { inaccurateNumbersEqual } from '../src/main';

it('test 1', () => {
  expect(inaccurateNumbersEqual(1.1, 1.2, 0)).toEqual(true);
});

it('test 2', () => {
  expect(inaccurateNumbersEqual(1.1, 1.2, 1)).toEqual(false);
});

it('test 3', () => {
  expect(inaccurateNumbersEqual(1.12, 1.13, 1)).toEqual(true);
});

it('test 4', () => {
  expect(inaccurateNumbersEqual(1.12, 1.15, 1)).toEqual(false);
});

it('test 5', () => {
  expect(inaccurateNumbersEqual(0.99, 0.989999, 2)).toEqual(true);
});

it('test 6', () => {
  expect(inaccurateNumbersEqual(0.123456, 0.123455, 5)).toEqual(true);
});

it('test 7', () => {
  expect(inaccurateNumbersEqual(0.123456, 0.12345, 5)).toEqual(false);
});

it('test 8', () => {
  expect(inaccurateNumbersEqual(0.12345678, 0.12345678, 7)).toEqual(true);
});

it('test 9', () => {
  expect(inaccurateNumbersEqual(1.12345671, 1.1234567, 7)).toEqual(true);
});
