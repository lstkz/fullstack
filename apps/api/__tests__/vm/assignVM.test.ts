import { mocked } from 'ts-jest/utils';
import { assignVM } from '../../src/contracts/vm/assignVM';
import { dispatchTask } from '../../src/dispatch';
import { execContract, setupDb } from '../helper';
import {
  addSubscription,
  createReadyVM,
  registerSampleUsers,
} from '../seed-data';

setupDb();

jest.mock('../../src/dispatch');
const mockedDispatchTask = mocked(dispatchTask);

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);
  mockedDispatchTask.mockReset();
});

it('should should throw if anonymous', async () => {
  await expect(execContract(assignVM, {})).rejects.toThrow(
    'Bearer token required'
  );
});

it('should should throw if not pro', async () => {
  await expect(execContract(assignVM, {}, 'user2_token')).rejects.toThrow(
    'Subscription required'
  );
});

it('should assign a vm and create a vm', async () => {
  const ret = await execContract(assignVM, {}, 'user1_token');
  expect(ret).toEqual({ isReady: false });
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
});

it('parallel test', async () => {
  await Promise.all([
    execContract(assignVM, {}, 'user1_token'),
    execContract(assignVM, {}, 'user1_token'),
  ]);
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
});

it('already ready', async () => {
  await createReadyVM();
  const ret = await execContract(assignVM, {}, 'user1_token');
  expect(ret).toEqual({ isReady: true });
});
