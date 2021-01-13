import { triangle } from '../src/main';

it('test 1', () => {
  expect(triangle(3, 1, 2)).toEqual(false);
});

it('test 2', () => {
  expect(triangle(5, 5, 4)).toEqual(true);
});

it('test 3', () => {
  expect(triangle(1, 10, 1)).toEqual(false);
});

it('test 4', () => {
  expect(triangle(1, 1, 1)).toEqual(true);
});

it('test 5', () => {
  expect(triangle(1, 2, 3)).toEqual(false);
});

it('test 6', () => {
  expect(triangle(1, 3, 2)).toEqual(false);
});

it('test 7', () => {
  expect(triangle(3, 2, 1)).toEqual(false);
});

it('test 8', () => {
  expect(triangle(661571327, 427890966, 962782891)).toEqual(true);
});

it('test 9', () => {
  expect(triangle(274899323, 909773856, 859128421)).toEqual(true);
});

it('test 10', () => {
  expect(triangle(436415650, 603704094, 698446165)).toEqual(true);
});

it('test 11', () => {
  expect(triangle(358803682, 154417485, 792685807)).toEqual(false);
});

it('test 12', () => {
  expect(triangle(287791342, 583299173, 397114434)).toEqual(true);
});

it('test 13', () => {
  expect(triangle(375240682, 690975783, 161634536)).toEqual(false);
});
