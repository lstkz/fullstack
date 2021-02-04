import * as R from 'remeda';
import { setupDb } from '../helper';
import { nextSeq } from '../../src/contracts/misc/nextSeq';

setupDb();

it('make many parallel sequences', async () => {
  const foo: number[] = [];
  const bar: number[] = [];

  const expectedIds = R.range(1, 11);
  await Promise.all([
    ...expectedIds.map(() =>
      nextSeq('FOO').then(id => {
        foo.push(id);
      })
    ),
    ...expectedIds.map(() =>
      nextSeq('BAR').then(id => {
        bar.push(id);
      })
    ),
  ]);

  foo.sort((a, b) => a - b);
  bar.sort((a, b) => a - b);

  expect(foo).toEqual(expectedIds);
  expect(bar).toEqual(expectedIds);
});
