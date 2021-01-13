import { maxStreak } from '../src/main';

it('test 1', () => {
  expect(maxStreak([1, 1, 0])).toEqual(2);
});

it('test 2', () => {
  expect(maxStreak([1, 0, 1, 0, 1])).toEqual(1);
});

it('test 3', () => {
  expect(maxStreak([0, 0])).toEqual(0);
});

it('test 4', () => {
  expect(maxStreak([1, 1, 0, 1, 1, 1])).toEqual(3);
});

it('test 5', () => {
  expect(maxStreak([1, 1, 0, 1, 1, 0, 1])).toEqual(2);
});

it('test 6', () => {
  expect(maxStreak([])).toEqual(0);
});

it('test 7', () => {
  expect(maxStreak([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toEqual(0);
});

it('test 8', () => {
  expect(maxStreak([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])).toEqual(10);
});

it('test 9', () => {
  expect(maxStreak([0, 1, 1])).toEqual(2);
});

it('test 10', () => {
  expect(maxStreak([1, 0, 1, 1])).toEqual(2);
});

it('test 11', () => {
  expect(maxStreak([1, 1, 0, 1, 1])).toEqual(2);
});

it('test 12', () => {
  expect(maxStreak([1, 1, 1, 0])).toEqual(3);
});
