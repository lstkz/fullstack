import { awesomeTriples } from '../src/main';

it('test 1', () => {
  expect(awesomeTriples([1, 2, 3])).toEqual([[0, 1, 2]]);
});

it('test 2', () => {
  expect(awesomeTriples([1, 2, 3, 3])).toEqual([
    [0, 1, 2],
    [0, 1, 3],
  ]);
});

it('test 3', () => {
  expect(awesomeTriples([10, 10, 20, 30])).toEqual([
    [0, 1, 2],
    [0, 1, 3],
    [0, 2, 3],
    [1, 2, 3],
  ]);
});

it('test 4', () => {
  expect(
    awesomeTriples([
      3641,
      7812,
      -961,
      271,
      -1008,
      -2583,
      3797,
      -4016,
      3772,
      9439,
    ])
  ).toEqual(require('./data/4.out.json'));
});

it('test 5', () => {
  expect(
    awesomeTriples([
      -4531,
      -6591,
      -633,
      9948,
      -5049,
      2123,
      -217,
      4375,
      8704,
      -1116,
      3762,
      -7462,
      4519,
      -3278,
      8622,
      -6815,
      4502,
      -2735,
      4503,
      1239,
    ])
  ).toEqual(require('./data/5.out.json'));
});

it('test 6', () => {
  const args = require('./data/6.in.json');
  const arr: number[] = args[0];
  expect(awesomeTriples(arr)).toEqual(require('./data/6.out.json'));
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr: number[] = args[0];
  expect(awesomeTriples(arr)).toEqual(require('./data/7.out.json'));
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: number[] = args[0];
  expect(awesomeTriples(arr)).toEqual(require('./data/8.out.json'));
});
