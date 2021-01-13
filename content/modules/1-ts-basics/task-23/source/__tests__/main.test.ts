import { sumAlmostTwoGreatest } from '../src/main';

it('test 1', () => {
  expect(sumAlmostTwoGreatest([1, 2, 3], [10, 20, 30])).toEqual(22);
});

it('test 2', () => {
  expect(sumAlmostTwoGreatest([5, 5, 1], [1, 2])).toEqual(6);
});

it('test 3', () => {
  expect(sumAlmostTwoGreatest([3, 3, 3, 3], [1, 1, 1, 1])).toEqual(4);
});

it('test 4', () => {
  expect(sumAlmostTwoGreatest([1, 2, 3, 4], [4, 3, 2, 1])).toEqual(6);
});

it('test 5', () => {
  expect(sumAlmostTwoGreatest([-100, -101, -102], [-10, -20, -30])).toEqual(
    -121
  );
});

it('test 6', () => {
  const args = require('./data/6.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumAlmostTwoGreatest(arr1, arr2)).toEqual(-8959724);
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumAlmostTwoGreatest(arr1, arr2)).toEqual(589700784);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumAlmostTwoGreatest(arr1, arr2)).toEqual(1998168840);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumAlmostTwoGreatest(arr1, arr2)).toEqual(1998824274);
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumAlmostTwoGreatest(arr1, arr2)).toEqual(1269293344);
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumAlmostTwoGreatest(arr1, arr2)).toEqual(1999894000);
});
