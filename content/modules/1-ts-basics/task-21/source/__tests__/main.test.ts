import { equalArrays } from '../src/main';

it('test 1', () => {
  expect(equalArrays([1, 2], [1, 2])).toEqual(true);
});

it('test 2', () => {
  expect(equalArrays([1, 2, 3], [1, 2])).toEqual(false);
});

it('test 3', () => {
  expect(equalArrays([1, 2], [2, 2])).toEqual(false);
});

it('test 4', () => {
  expect(equalArrays([], [])).toEqual(true);
});

it('test 5', () => {
  const args = require('./data/5.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(true);
});

it('test 6', () => {
  const args = require('./data/6.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(false);
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(false);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(true);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(false);
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(true);
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(false);
});

it('test 12', () => {
  const args = require('./data/12.in.json');
  const arr1: number[] = args[0];
  const arr2: number[] = args[1];
  expect(equalArrays(arr1, arr2)).toEqual(false);
});
