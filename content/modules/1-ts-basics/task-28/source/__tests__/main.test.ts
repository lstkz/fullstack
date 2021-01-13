import { longestIncreasing } from '../src/main';

it('test 1', () => {
  expect(longestIncreasing([1, 2, 3, 1, 2])).toEqual(3);
});

it('test 2', () => {
  expect(longestIncreasing([1, 1, 1])).toEqual(1);
});

it('test 3', () => {
  expect(longestIncreasing([1, 5, 10, 15])).toEqual(4);
});

it('test 4', () => {
  expect(longestIncreasing([1, 5, 10, 9, 15])).toEqual(3);
});

it('test 5', () => {
  expect(longestIncreasing([10, -6, -5, 0, 2, 1])).toEqual(4);
});

it('test 6', () => {
  expect(
    longestIncreasing([
      -806161387,
      -999906817,
      549209900,
      -505422726,
      -740315432,
      -508440748,
      316192049,
      621484981,
      739865537,
      934725257,
      -294230617,
      -677219557,
      949774657,
      163782404,
      53407437,
      60927230,
      -572691028,
      -383148080,
      -961479139,
      -131999209,
    ])
  ).toEqual(6);
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr: number[] = args[0];
  expect(longestIncreasing(arr)).toEqual(4);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: number[] = args[0];
  expect(longestIncreasing(arr)).toEqual(6);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr: number[] = args[0];
  expect(longestIncreasing(arr)).toEqual(6);
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr: number[] = args[0];
  expect(longestIncreasing(arr)).toEqual(1000);
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr: number[] = args[0];
  expect(longestIncreasing(arr)).toEqual(1000);
});
