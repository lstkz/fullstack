import { gambler } from '../src/main';

it('test 1', () => {
  expect(gambler(100, 7)).toEqual(3);
});

it('test 2', () => {
  expect(gambler(100, 8)).toEqual(4);
});

it('test 3', () => {
  expect(gambler(100, 13)).toEqual(4);
});

it('test 4', () => {
  expect(gambler(2, 7)).toEqual(4);
});

it('test 5', () => {
  expect(gambler(30, 30)).toEqual(5);
});

it('test 6', () => {
  expect(gambler(5, 22)).toEqual(6);
});

it('test 7', () => {
  expect(gambler(100000, 100000)).toEqual(17);
});

it('test 8', () => {
  expect(gambler(100001, 100000)).toEqual(17);
});

it('test 9', () => {
  expect(gambler(1000000000, 1000000000)).toEqual(30);
});

it('test 10', () => {
  expect(gambler(1, 1000000000)).toEqual(1000000000);
});

it('test 11', () => {
  expect(gambler(2, 1000000000)).toEqual(500000001);
});

it('test 12', () => {
  expect(gambler(13, 1000000000)).toEqual(76923080);
});

it('test 13', () => {
  expect(gambler(1441, 1000000000)).toEqual(693972);
});

it('test 14', () => {
  expect(gambler(592217432, 162830072)).toEqual(28);
});

it('test 15', () => {
  expect(gambler(882679738, 320350358)).toEqual(29);
});

it('test 16', () => {
  expect(gambler(834833237, 876708940)).toEqual(30);
});

it('test 17', () => {
  expect(gambler(324125779, 90395024)).toEqual(27);
});

it('test 18', () => {
  expect(gambler(11937864, 992222038)).toEqual(106);
});

it('test 19', () => {
  expect(gambler(814657938, 558557478)).toEqual(30);
});

it('test 20', () => {
  expect(gambler(343368050, 203935295)).toEqual(28);
});

it('test 21', () => {
  expect(gambler(643298, 191945543)).toEqual(317);
});
