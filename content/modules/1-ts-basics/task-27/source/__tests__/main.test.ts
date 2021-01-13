import { numberDistance } from '../src/main';

it('test 1', () => {
  expect(numberDistance(0, 6)).toEqual(6);
});

it('test 2', () => {
  expect(numberDistance(1, 6)).toEqual(5);
});

it('test 3', () => {
  expect(numberDistance(-1, 6)).toEqual(7);
});

it('test 4', () => {
  expect(numberDistance(-3, -5)).toEqual(2);
});

it('test 5', () => {
  expect(numberDistance(-5, -3)).toEqual(2);
});

it('test 6', () => {
  expect(numberDistance(3, 3)).toEqual(0);
});

it('test 7', () => {
  expect(numberDistance(35312947, 399702183)).toEqual(364389236);
});

it('test 8', () => {
  expect(numberDistance(-917331586, 996255432)).toEqual(1913587018);
});

it('test 9', () => {
  expect(numberDistance(-931012914, -657293621)).toEqual(273719293);
});

it('test 10', () => {
  expect(numberDistance(98111198, -991242769)).toEqual(1089353967);
});

it('test 11', () => {
  expect(numberDistance(650782224, 176807759)).toEqual(473974465);
});

it('test 12', () => {
  expect(numberDistance(-81983252, 79933278)).toEqual(161916530);
});

it('test 13', () => {
  expect(numberDistance(-96278832, 590212756)).toEqual(686491588);
});

it('test 14', () => {
  expect(numberDistance(303061820, -758869958)).toEqual(1061931778);
});
