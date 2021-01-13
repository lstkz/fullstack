import { missingNumber } from '../src/main';

it('test 1', () => {
  expect(missingNumber([1, 1, 2, null], 6)).toEqual(2);
});

it('test 2', () => {
  expect(missingNumber([1, 1, null, 10, 2, 2], 26)).toEqual(10);
});

it('test 3', () => {
  expect(missingNumber([5, null], 10)).toEqual(5);
});

it('test 4', () => {
  expect(missingNumber([null, 1, 2, 3, 2, 3], 12)).toEqual(1);
});

it('test 5', () => {
  expect(missingNumber([null, 1000, 1000, 999, 999, 1], 4000)).toEqual(1);
});

it('test 6', () => {
  expect(
    missingNumber([null, 1000, 1000, 999, 999, 998, 998, 997], 7988)
  ).toEqual(997);
});

it('test 7', () => {
  expect(
    missingNumber(
      [
        457,
        850,
        850,
        190,
        189,
        750,
        715,
        103,
        567,
        82,
        null,
        750,
        190,
        103,
        500,
        567,
        457,
        189,
        715,
        82,
      ],
      8806
    )
  ).toEqual(500);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: Array<number | null> = args[0];
  const sum: number = args[1];
  expect(missingNumber(arr, sum)).toEqual(334);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr: Array<number | null> = args[0];
  const sum: number = args[1];
  expect(missingNumber(arr, sum)).toEqual(105);
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr: Array<number | null> = args[0];
  const sum: number = args[1];
  expect(missingNumber(arr, sum)).toEqual(596);
});
