import { revertSubArray } from '../src/main';

it('test 1', () => {
  expect(revertSubArray([1, 2, 3, 4, 5], 0, 1)).toEqual([2, 1, 3, 4, 5]);
});

it('test 2', () => {
  expect(revertSubArray([1, 2, 3, 4, 5], 0, 3)).toEqual([4, 3, 2, 1, 5]);
});

it('test 3', () => {
  expect(revertSubArray([1, 2, 3, 4, 5], 1, 3)).toEqual([1, 4, 3, 2, 5]);
});

it('test 4', () => {
  expect(revertSubArray([1, 2, 3, 4, 5], 0, 4)).toEqual([5, 4, 3, 2, 1]);
});

it('test 5', () => {
  expect(revertSubArray([-3431, -7062], 0, 1)).toEqual([-7062, -3431]);
});

it('test 6', () => {
  const args = require('./data/6.in.json');
  const arr: number[] = args[0];
  const start: number = args[1];
  const end: number = args[2];
  expect(revertSubArray(arr, start, end)).toEqual(require('./data/6.out.json'));
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr: number[] = args[0];
  const start: number = args[1];
  const end: number = args[2];
  expect(revertSubArray(arr, start, end)).toEqual(require('./data/7.out.json'));
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: number[] = args[0];
  const start: number = args[1];
  const end: number = args[2];
  expect(revertSubArray(arr, start, end)).toEqual(require('./data/8.out.json'));
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr: number[] = args[0];
  const start: number = args[1];
  const end: number = args[2];
  expect(revertSubArray(arr, start, end)).toEqual(require('./data/9.out.json'));
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr: number[] = args[0];
  const start: number = args[1];
  const end: number = args[2];
  expect(revertSubArray(arr, start, end)).toEqual(
    require('./data/10.out.json')
  );
});
