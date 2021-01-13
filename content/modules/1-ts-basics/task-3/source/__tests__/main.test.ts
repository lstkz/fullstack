import { warmestMonth } from '../src/main';

it('test 1', () => {
  expect(warmestMonth([1, 1, 2, 4, 5, 6, 10, 9, 9, 1, 2, 3])).toEqual(7);
});

it('test 2', () => {
  expect(warmestMonth([1, 1, 2, 4, 5, 6, 9, 9, 9, 1, 2, 3])).toEqual(null);
});

it('test 3', () => {
  expect(warmestMonth([1, 1, 2, 4, 5, 21, 20, 20, 9, 1, 2, 3])).toEqual(6);
});

it('test 4', () => {
  expect(warmestMonth([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20])).toEqual(12);
});

it('test 5', () => {
  expect(warmestMonth([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 20, 1])).toEqual(11);
});

it('test 6', () => {
  expect(warmestMonth([20, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toEqual(1);
});

it('test 7', () => {
  expect(warmestMonth([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toEqual(null);
});

it('test 8', () => {
  expect(warmestMonth([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toEqual(null);
});

it('test 9', () => {
  expect(warmestMonth([0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0])).toEqual(6);
});

it('test 10', () => {
  expect(warmestMonth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])).toEqual(12);
});
