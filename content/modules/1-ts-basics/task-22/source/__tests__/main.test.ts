import { lowestRounding } from '../src/main';

it('test 1', () => {
  expect(lowestRounding(0.34, 0.341)).toEqual(2);
});

it('test 2', () => {
  expect(lowestRounding(1.2345, 1.2)).toEqual(1);
});

it('test 3', () => {
  expect(lowestRounding(1.2345, 1.23)).toEqual(2);
});

it('test 4', () => {
  expect(lowestRounding(1.111111, 1.122222)).toEqual(1);
});

it('test 5', () => {
  expect(lowestRounding(1.251111, 1.222222)).toEqual(0);
});

it('test 6', () => {
  expect(lowestRounding(1.2, 2.2)).toEqual(-1);
});

it('test 7', () => {
  expect(lowestRounding(1.2, 2.2)).toEqual(-1);
});

it('test 8', () => {
  expect(lowestRounding(1.134521, 2.134521)).toEqual(-1);
});

it('test 9', () => {
  expect(lowestRounding(2.134522, 2.134521)).toEqual(5);
});

it('test 10', () => {
  expect(lowestRounding(2.134552, 2.134555)).toEqual(4);
});
