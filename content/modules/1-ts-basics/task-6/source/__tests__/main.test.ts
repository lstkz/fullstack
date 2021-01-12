import { clamp } from '../src/main';

it('test 1', () => {
  expect(clamp(0, 2, 5)).toEqual(2);
});

it('test 2', () => {
  expect(clamp(10, 2, 5)).toEqual(5);
});

it('test 3', () => {
  expect(clamp(3, 2, 5)).toEqual(3);
});

it('test 4', () => {
  expect(clamp(-3, -2, 5)).toEqual(-2);
});

it('test 5', () => {
  expect(clamp(-3, 0, 0)).toEqual(0);
});

it('test 6', () => {
  expect(clamp(1234, -100000, 100000)).toEqual(1234);
});

it('test 7', () => {
  expect(clamp(-1234, -100000, 100000)).toEqual(-1234);
});

it('test 8', () => {
  expect(clamp(0, 0, 0)).toEqual(0);
});

it('test 9', () => {
  expect(clamp(2, 1, 3)).toEqual(2);
});

it('test 10', () => {
  expect(clamp(-246098801, 447807320, 41570011)).toEqual(447807320);
});

it('test 11', () => {
  expect(clamp(-917273529, -7447445, -682653543)).toEqual(-7447445);
});

it('test 12', () => {
  expect(clamp(-79082165, -883760414, -184293455)).toEqual(-184293455);
});

it('test 13', () => {
  expect(clamp(970502202, -895797752, -442452403)).toEqual(-442452403);
});

it('test 14', () => {
  expect(clamp(-332739498, -725461629, 853455975)).toEqual(-332739498);
});
