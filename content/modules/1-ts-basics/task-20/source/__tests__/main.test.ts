import { sumTwoGreatest } from '../src/main';

it('test 1', () => {
  expect(sumTwoGreatest([11, 2], [7])).toEqual(18);
});

it('test 2', () => {
  expect(sumTwoGreatest([10, 10, 11], [11, 10])).toEqual(22);
});

it('test 3', () => {
  expect(sumTwoGreatest([10, 10, 11], [11, 10])).toEqual(22);
});

it('test 4', () => {
  expect(sumTwoGreatest([1, 2, 3], [3, 2, 1])).toEqual(6);
});

it('test 5', () => {
  expect(sumTwoGreatest([-100, -101, -102], [-10, -20, -30])).toEqual(-110);
});

it('test 6', () => {
  const args = require('./data/6.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumTwoGreatest(arr1, arr2)).toEqual(-817240809);
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumTwoGreatest(arr1, arr2)).toEqual(992016984);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumTwoGreatest(arr1, arr2)).toEqual(995796475);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumTwoGreatest(arr1, arr2)).toEqual(999916373);
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumTwoGreatest(arr1, arr2)).toEqual(1000057555);
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(sumTwoGreatest(arr1, arr2)).toEqual(1000099731);
});
