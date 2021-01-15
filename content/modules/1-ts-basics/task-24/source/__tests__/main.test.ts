import { strangeWar } from '../src/main';

it('test 1', () => {
  expect(strangeWar([1, 2, 3])).toEqual(2);
});

it('test 2', () => {
  expect(strangeWar([1, 2, 3, 4])).toEqual(3);
});

it('test 3', () => {
  expect(strangeWar([1, 1])).toEqual(1);
});

it('test 4', () => {
  expect(strangeWar([4])).toEqual(4);
});

it('test 5', () => {
  expect(strangeWar([1, 1, 1, 3, 3, 3])).toEqual(3);
});

it('test 6', () => {
  expect(strangeWar([1, 1, 1, 3, 3])).toEqual(1);
});

it('test 7', () => {
  expect(
    strangeWar([
      -764552398,
      -635798960,
      -625712717,
      -613586789,
      -597879585,
      -522545343,
      -394847495,
      -75264923,
      88857047,
      107356596,
      121686044,
      287341540,
      358011567,
      587907204,
      711505102,
      715361094,
      744518572,
      790331158,
      829660832,
      998256869,
    ])
  ).toEqual(121686044);
});

it('test 8', () => {
  const args = require('./data/8.in.json');
  const arr: number[] = args[0];
  expect(strangeWar(arr)).toEqual(217236893);
});

it('test 9', () => {
  const args = require('./data/9.in.json');
  const arr: number[] = args[0];
  expect(strangeWar(arr)).toEqual(131222347);
});

it('test 10', () => {
  const args = require('./data/10.in.json');
  const arr: number[] = args[0];
  expect(strangeWar(arr)).toEqual(-35104712);
});

it('test 11', () => {
  const args = require('./data/11.in.json');
  const arr: number[] = args[0];
  expect(strangeWar(arr)).toEqual(-13833991);
});

it('test 12', () => {
  const args = require('./data/12.in.json');
  const arr: number[] = args[0];
  expect(strangeWar(arr)).toEqual(-7196692);
});
