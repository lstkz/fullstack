import { middleNumber } from '../src/main';

it('test 1', () => {
  expect(middleNumber(1, 2, 3)).toEqual(2);
});

it('test 2', () => {
  expect(middleNumber(3, 2, 1)).toEqual(2);
});

it('test 3', () => {
  expect(middleNumber(2, 3, 1)).toEqual(2);
});

it('test 4', () => {
  expect(middleNumber(1, 3, 2)).toEqual(2);
});

it('test 5', () => {
  expect(middleNumber(1, 1, 1)).toEqual(1);
});

it('test 6', () => {
  expect(middleNumber(1, 1, 2)).toEqual(1);
});

it('test 7', () => {
  expect(middleNumber(2, 1, 2)).toEqual(2);
});

it('test 8', () => {
  expect(middleNumber(10000000, 100000000, 1000000000)).toEqual(100000000);
});

it('test 9', () => {
  expect(middleNumber(100000000, 1000000000, 10000000)).toEqual(100000000);
});

it('test 10', () => {
  expect(middleNumber(-10, -100, -1)).toEqual(-10);
});

it('test 11', () => {
  expect(middleNumber(-1, -100, -10)).toEqual(-10);
});

it('test 12', () => {
  expect(middleNumber(-2, -1, 0)).toEqual(-1);
});

it('test 13', () => {
  expect(middleNumber(0, 0, 0)).toEqual(0);
});
