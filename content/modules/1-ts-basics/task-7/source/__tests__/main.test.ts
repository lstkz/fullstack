import { cycledIndex } from '../src/main';

it('test 1', () => {
  expect(cycledIndex([10, 11, 12, 13, 14], 4)).toEqual(14);
});

it('test 2', () => {
  expect(cycledIndex([10, 11, 12, 13, 14], 0)).toEqual(10);
});

it('test 3', () => {
  expect(cycledIndex([10, 11, 12, 13, 14], 5)).toEqual(10);
});

it('test 4', () => {
  expect(cycledIndex([1, 2, 3], 9)).toEqual(1);
});

it('test 5', () => {
  expect(cycledIndex([1, 2, 3], 100)).toEqual(2);
});

it('test 6', () => {
  expect(cycledIndex([1, 2, 3], 1000000)).toEqual(2);
});

it('test 7', () => {
  expect(cycledIndex([7], 50)).toEqual(7);
});

it('test 8', () => {
  expect(cycledIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 1000000000)).toEqual(1);
});

it('test 9', () => {
  expect(cycledIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 999999999)).toEqual(10);
});

it('test 10', () => {
  expect(cycledIndex([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7)).toEqual(8);
});

it('test 11', () => {
  expect(
    cycledIndex(
      [
        -740951672,
        -184325651,
        424043614,
        843280314,
        -54940546,
        -641417731,
        -596339008,
        -968385978,
        392703661,
        -332399340,
        -577807771,
        -216338544,
        -459708960,
        502742022,
        877493692,
        897592336,
        351819330,
        -65358864,
        986540451,
        224114127,
      ],
      625883995
    )
  ).toEqual(897592336);
});

it('test 12', () => {
  const args = require('./data/12.in.json');
  const arr: number[] = args[0];
  const idx: number = args[1];
  expect(cycledIndex(arr, idx)).toEqual(993768817);
});

it('test 13', () => {
  const args = require('./data/13.in.json');
  const arr: number[] = args[0];
  const idx: number = args[1];
  expect(cycledIndex(arr, idx)).toEqual(986133909);
});

it('test 14', () => {
  const args = require('./data/14.in.json');
  const arr: number[] = args[0];
  const idx: number = args[1];
  expect(cycledIndex(arr, idx)).toEqual(-555974173);
});
