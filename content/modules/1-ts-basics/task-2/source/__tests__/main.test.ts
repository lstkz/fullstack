import { roundCurrency } from '../src/main';

it('test 1', () => {
  expect(roundCurrency(1.101)).toEqual(1.1);
});

it('test 2', () => {
  expect(roundCurrency(10.59999)).toEqual(10.6);
});

it('test 3', () => {
  expect(roundCurrency(4.123)).toEqual(4.12);
});

it('test 4', () => {
  expect(roundCurrency(4.44499)).toEqual(4.44);
});

it('test 5', () => {
  expect(roundCurrency(1000)).toEqual(1000);
});

it('test 6', () => {
  expect(roundCurrency(651.3333)).toEqual(651.33);
});

it('test 7', () => {
  expect(roundCurrency(51.9999)).toEqual(52);
});

it('test 8', () => {
  expect(roundCurrency(0)).toEqual(0);
});

it('test 9', () => {
  expect(roundCurrency(1.000001)).toEqual(1);
});
