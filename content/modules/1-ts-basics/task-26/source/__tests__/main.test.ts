import { numberSequence } from '../src/main';

it('test 1', () => {
  expect(numberSequence(1, 3)).toEqual([1, 2, 3]);
});

it('test 2', () => {
  expect(numberSequence(3, 1)).toEqual([3, 2, 1]);
});

it('test 3', () => {
  expect(numberSequence(0, 1)).toEqual([0, 1]);
});

it('test 4', () => {
  expect(numberSequence(-5, -3)).toEqual([-5, -4, -3]);
});

it('test 5', () => {
  expect(numberSequence(-2, -5)).toEqual([-2, -3, -4, -5]);
});

it('test 6', () => {
  expect(numberSequence(-10, 14)).toEqual(require('./data/6.out.json'));
});

it('test 7', () => {
  expect(numberSequence(-14, 21)).toEqual(require('./data/7.out.json'));
});

it('test 8', () => {
  expect(numberSequence(-100, 0)).toEqual(require('./data/8.out.json'));
});

it('test 9', () => {
  expect(numberSequence(0, 1000)).toEqual(require('./data/9.out.json'));
});

it('test 10', () => {
  expect(numberSequence(456, 1000)).toEqual(require('./data/10.out.json'));
});

it('test 11', () => {
  expect(numberSequence(-1000, 1)).toEqual(require('./data/11.out.json'));
});

it('test 12', () => {
  expect(numberSequence(-1000, 1000)).toEqual(require('./data/12.out.json'));
});
