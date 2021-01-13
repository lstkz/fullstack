import { calcPages } from '../src/main';

it('test 1', () => {
  expect(calcPages(10, 5)).toEqual(2);
});

it('test 2', () => {
  expect(calcPages(11, 5)).toEqual(3);
});

it('test 3', () => {
  expect(calcPages(1, 100)).toEqual(1);
});

it('test 4', () => {
  expect(calcPages(0, 100)).toEqual(0);
});

it('test 5', () => {
  expect(calcPages(1000, 100)).toEqual(10);
});

it('test 6', () => {
  expect(calcPages(1543, 13)).toEqual(119);
});

it('test 7', () => {
  expect(calcPages(7541469, 13)).toEqual(580113);
});

it('test 8', () => {
  expect(calcPages(7541469, 1)).toEqual(7541469);
});

it('test 9', () => {
  expect(calcPages(0, 1)).toEqual(0);
});

it('test 10', () => {
  expect(calcPages(179146805, 575)).toEqual(311560);
});

it('test 11', () => {
  expect(calcPages(202067400, 921)).toEqual(219400);
});

it('test 12', () => {
  expect(calcPages(830025161, 59)).toEqual(14068224);
});

it('test 13', () => {
  expect(calcPages(822449025, 103)).toEqual(7984942);
});
