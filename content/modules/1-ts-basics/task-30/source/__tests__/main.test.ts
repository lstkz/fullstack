import { mixture } from '../src/main';

it('test 1', () => {
  expect(mixture(2, 5, 3)).toEqual(1);
});

it('test 2', () => {
  expect(mixture(100, 100, 4)).toEqual(1);
});

it('test 3', () => {
  expect(mixture(4, 10, 6)).toEqual(2);
});

it('test 4', () => {
  expect(mixture(6, 15, 12)).toEqual(3);
});

it('test 5', () => {
  expect(mixture(6, 15, 0)).toEqual(0);
});

it('test 6', () => {
  expect(mixture(37403082, 304266481, 437999315)).toEqual(18701541);
});

it('test 7', () => {
  expect(mixture(675969491, 85629740, 349226713)).toEqual(17125948);
});

it('test 8', () => {
  expect(mixture(656464666, 796950860, 957047674)).toEqual(159390172);
});

it('test 9', () => {
  expect(mixture(926288606, 276862198, 817881817)).toEqual(55372439);
});

it('test 10', () => {
  expect(mixture(225987347, 887972274, 556883365)).toEqual(112993673);
});

it('test 11', () => {
  expect(mixture(578204626, 48244712, 687957214)).toEqual(9648942);
});

it('test 12', () => {
  expect(mixture(213748983, 68323327, 702881154)).toEqual(13664665);
});

it('test 13', () => {
  expect(mixture(733570275, 481089295, 463375064)).toEqual(96217859);
});

it('test 14', () => {
  expect(mixture(841392395, 740799426, 800530219)).toEqual(148159885);
});

it('test 15', () => {
  expect(mixture(0, 244787564, 641770274)).toEqual(0);
});

it('test 16', () => {
  expect(mixture(68656068, 0, 841982360)).toEqual(0);
});

it('test 17', () => {
  expect(mixture(402199806, 17635188, 0)).toEqual(0);
});
