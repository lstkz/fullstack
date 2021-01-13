import { intervals } from '../src/main';

it('test 1', () => {
  expect(intervals([1, 2, 3, 4, 6])).toEqual([[1, 2, 3, 4], [6]]);
});

it('test 2', () => {
  expect(intervals([1, 3, 5])).toEqual([[1], [3], [5]]);
});

it('test 3', () => {
  expect(intervals([1, 2, 3])).toEqual([[1, 2, 3]]);
});

it('test 4', () => {
  expect(intervals([1, 1, 3, 3, 4])).toEqual([[1], [1], [3], [3, 4]]);
});

it('test 5', () => {
  expect(intervals([2, 0, 1, 4, 3, 2, 3, 4, 5, 6])).toEqual([
    [2],
    [0, 1],
    [4],
    [3],
    [2, 3, 4, 5, 6],
  ]);
});

it('test 6', () => {
  expect(
    intervals([7, 8, 1, 0, 1, 0, 1, 6, 2, 9, 4, 1, 3, 5, 4, 2, 4, 8, 7, 8])
  ).toEqual([
    [7, 8],
    [1],
    [0, 1],
    [0, 1],
    [6],
    [2],
    [9],
    [4],
    [1],
    [3],
    [5],
    [4],
    [2],
    [4],
    [8],
    [7, 8],
  ]);
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr: number[] = args[0];
  expect(intervals(arr)).toEqual([
    [58],
    [24],
    [79],
    [64, 65, 66],
    [72, 73],
    [89, 90, 91, 92],
    [89],
    [35],
    [35, 36],
    [89, 90],
    [54],
    [93],
    [31, 32],
    [58],
    [0],
    [49],
    [52, 53],
    [45],
    [16, 17],
  ]);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: number[] = args[0];
  expect(intervals(arr)).toEqual([
    [9487],
    [7852, 7853, 7854, 7855],
    [3042, 3043],
    [2157, 2158, 2159],
    [16421],
    [8488, 8489],
    [5316],
    [8645, 8646],
    [18159],
    [13404, 13405, 13406],
    [3593],
    [15542, 15543],
    [16381, 16382, 16383, 16384, 16385],
    [383],
    [105],
  ]);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr: number[] = args[0];
  expect(intervals(arr)).toEqual(require('./data/9.out.json'));
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr: number[] = args[0];
  expect(intervals(arr)).toEqual(require('./data/10.out.json'));
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr: number[] = args[0];
  expect(intervals(arr)).toEqual(require('./data/11.out.json'));
});
