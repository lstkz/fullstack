import { targetArraySum } from '../src/main';

it('test 1', () => {
  expect(targetArraySum([1, 2, 3], 3)).toEqual([1, 2]);
});

it('test 2', () => {
  expect(targetArraySum([1, 2, 3, 4, 5, 6], 14)).toEqual([2, 3, 4, 5]);
});

it('test 3', () => {
  expect(targetArraySum([10, 20, 30], 10)).toEqual([10]);
});

it('test 4', () => {
  expect(targetArraySum([10, 10, 20, 1], 21)).toEqual([20, 1]);
});

it('test 5', () => {
  const args = require('./data/5.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual([
    79039,
    97002,
    29329,
    14745,
    51475,
    46302,
    83997,
    62869,
    64188,
    14159,
  ]);
});

it('test 6', () => {
  const args = require('./data/6.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/6.out.json'));
});

it('test 7', () => {
  const args = require('./data/7.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/7.out.json'));
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/8.out.json'));
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/9.out.json'));
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/10.out.json'));
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual([55439]);
});

it('test 12', () => {
  const args = require('./data/12.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/12.out.json'));
});

it('test 13', () => {
  const args = require('./data/13.in.json');
  const arr: number[] = args[0];
  const sum: number = args[1];
  expect(targetArraySum(arr, sum)).toEqual(require('./data/13.out.json'));
});
