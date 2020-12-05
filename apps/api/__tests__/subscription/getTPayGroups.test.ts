import { mocked } from 'ts-jest/utils';
import { getTPayGroups as _getTPayGroups } from '../../src/common/tpay';
import { getTPayGroups } from '../../src/contracts/subscription/getTPayGroups';
import { execContract, setupDb } from '../helper';

jest.mock('../../src/common/tpay');

const mockedGetTPayGroups = mocked(_getTPayGroups);

beforeEach(async () => {
  mockedGetTPayGroups.mockClear();
  mockedGetTPayGroups.mockImplementation(async () => [
    {
      id: 100,
      name: 'bank 100',
      banks: '',
      img: 'img',
      main_bank_id: 100,
    },
    {
      id: 101,
      name: 'bank 101',
      banks: '',
      img: 'img',
      main_bank_id: 101,
    },
  ]);
});

setupDb();

it('should return groups', async () => {
  const ret = await execContract(getTPayGroups, {});
  expect(ret).toEqual([
    {
      id: 100,
      name: 'bank 100',
      banks: '',
      img: 'img',
      main_bank_id: 100,
    },
    {
      id: 101,
      name: 'bank 101',
      banks: '',
      img: 'img',
      main_bank_id: 101,
    },
  ]);
});
