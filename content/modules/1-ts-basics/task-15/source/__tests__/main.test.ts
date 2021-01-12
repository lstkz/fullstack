import { banknotes } from '../src/main';

it('test 1', () => {
  expect(banknotes(8)).toEqual(4);
});

it('test 2', () => {
  expect(banknotes(3)).toEqual(3);
});

it('test 3', () => {
  expect(banknotes(10)).toEqual(1);
});

it('test 4', () => {
  expect(banknotes(101)).toEqual(2);
});

it('test 5', () => {
  expect(banknotes(30)).toEqual(2);
});

it('test 6', () => {
  expect(banknotes(265)).toEqual(5);
});

it('test 7', () => {
  expect(banknotes(99)).toEqual(8);
});

it('test 8', () => {
  expect(banknotes(1000000000)).toEqual(10000000);
});

it('test 9', () => {
  expect(banknotes(192712230)).toEqual(1927124);
});

it('test 10', () => {
  expect(banknotes(619837942)).toEqual(6198383);
});

it('test 11', () => {
  expect(banknotes(968479774)).toEqual(9684803);
});

it('test 12', () => {
  expect(banknotes(405194399)).toEqual(4051951);
});

it('test 13', () => {
  expect(banknotes(100842961)).toEqual(1008432);
});

it('test 14', () => {
  expect(banknotes(942994422)).toEqual(9429947);
});
