import { floorNumber } from '../src/main';

it('test 1', () => {
  expect(floorNumber([5, 10, 10], 0)).toEqual(0);
});

it('test 2', () => {
  expect(floorNumber([5, 10, 10], 4)).toEqual(0);
});

it('test 3', () => {
  expect(floorNumber([5, 10, 10], 5)).toEqual(1);
});

it('test 4', () => {
  expect(floorNumber([5, 10, 10], 15)).toEqual(2);
});

it('test 5', () => {
  expect(floorNumber([5, 10, 10], 25)).toEqual(2);
});

it('test 6', () => {
  expect(floorNumber([5, 10, 10], 50)).toEqual(-1);
});

it('test 7', () => {
  expect(floorNumber([5, 10, 10], 24)).toEqual(2);
});

it('test 8', () => {
  expect(floorNumber([5, 10, 10], 26)).toEqual(-1);
});

it('test 9', () => {
  expect(floorNumber([1, 2, 2, 3, 3, 5], 10)).toEqual(4);
});

it('test 10', () => {
  expect(
    floorNumber([352, 350, 353, 97, 77, 195, 27, 407, 159, 379], 461)
  ).toEqual(1);
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const heights: number[] = args[0];
  const h: number = args[1];
  expect(floorNumber(heights, h)).toEqual(12);
});

it('test 12', () => {
  const args = require('./data/12.in.json');
  const heights: number[] = args[0];
  const h: number = args[1];
  expect(floorNumber(heights, h)).toEqual(95);
});

it('test 13', () => {
  const args = require('./data/13.in.json');
  const heights: number[] = args[0];
  const h: number = args[1];
  expect(floorNumber(heights, h)).toEqual(419);
});

it('test 14', () => {
  const args = require('./data/14.in.json');
  const heights: number[] = args[0];
  const h: number = args[1];
  expect(floorNumber(heights, h)).toEqual(979);
});

it('test 15', () => {
  const args = require('./data/15.in.json');
  const heights: number[] = args[0];
  const h: number = args[1];
  expect(floorNumber(heights, h)).toEqual(655);
});

it('test 16', () => {
  const args = require('./data/16.in.json');
  const heights: number[] = args[0];
  const h: number = args[1];
  expect(floorNumber(heights, h)).toEqual(199);
});
