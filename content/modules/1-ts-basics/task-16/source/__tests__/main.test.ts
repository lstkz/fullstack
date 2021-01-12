import { equalCards } from '../src/main';

it('test 1', () => {
  expect(equalCards(['2d', '3d'], ['2d', '3d'])).toEqual(true);
});

it('test 2', () => {
  expect(equalCards(['2d', '3d'], ['3d', '2d'])).toEqual(true);
});

it('test 3', () => {
  expect(equalCards(['2d', '3c'], ['3d', '2d'])).toEqual(false);
});

it('test 4', () => {
  expect(equalCards(['Ad', 'Ac'], ['Ad', 'Kd'])).toEqual(false);
});

it('test 5', () => {
  expect(equalCards(['5d', '5c'], ['5c', '5d'])).toEqual(true);
});

it('test 6', () => {
  expect(equalCards(['5d', '5c'], ['5c', '6d'])).toEqual(false);
});

it('test 7', () => {
  expect(equalCards(['6d', '5c'], ['5c', '6d'])).toEqual(true);
});

it('test 8', () => {
  expect(equalCards(['5c', '6d'], ['5c', '6d'])).toEqual(true);
});

it('test 9', () => {
  expect(equalCards(['5c', '6d'], ['6d', '2d'])).toEqual(false);
});
