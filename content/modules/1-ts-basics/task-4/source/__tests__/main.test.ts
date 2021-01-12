import { roundSum } from '../src/main';

it('test 1', () => {
  expect(roundSum([60, 40], [10, 20, 30, 40])).toEqual(null);
});

it('test 2', () => {
  expect(roundSum([50, 40], [150])).toEqual([0, 0]);
});

it('test 3', () => {
  expect(roundSum([1, 2, 3, 4], [1, 2, 3])).toEqual(null);
});

it('test 4', () => {
  expect(roundSum([60, 40], [40, 60])).toEqual(null);
});

it('test 5', () => {
  expect(roundSum([201, 100, 301], [50, 1, 2, 0])).toEqual(null);
});

it('test 6', () => {
  expect(roundSum([5], [5])).toEqual(null);
});

it('test 7', () => {
  expect(
    roundSum(
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
      [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    )
  ).toEqual(null);
});

it('test 8', () => {
  expect(roundSum([98], [1])).toEqual(null);
});

it('test 9', () => {
  expect(roundSum([100000, 1, 2, 3, 4], [1, 100000, 2, 3, 4])).toEqual([0, 1]);
});

it('test 10', () => {
  expect(roundSum([1, 100000, 2, 3, 4], [100000, 1, 2, 3, 4])).toEqual([1, 0]);
});

it('test 11', () => {
  expect(roundSum([1, 2, 3], [1, 2, 7])).toEqual(null);
});

it('test 12', () => {
  expect(roundSum([9], [1])).toEqual(null);
});
