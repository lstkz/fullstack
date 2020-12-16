import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { assignVM } from '../../src/contracts/vm/assignVM';
import { dispatchTask } from '../../src/dispatch';
import { execContract, setupDb } from '../helper';
import { addSubscription, createVM, registerSampleUsers } from '../seed-data';

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
  expect(mockedDispatchTask).toHaveBeenCalledWith({
    type: 'VMStep1Create',
    payload: expect.anything(),
  });
});

it('should assign a vm (parallel test)', async () => {
  await Promise.all([
    execContract(assignVM, {}, 'user1_token'),
    execContract(assignVM, {}, 'user1_token'),
  ]);
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
});

it('already ready', async () => {
  await createVM();
  const ret = await execContract(assignVM, {}, 'user1_token');
  expect(ret).toEqual({ isReady: true });
});

it('should start a vm', async () => {
  await createVM('stopped');
  const ret = await execContract(assignVM, {}, 'user1_token');
  expect(ret).toEqual({ isReady: false });
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.status).toEqual('resuming');
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
  expect(mockedDispatchTask).toHaveBeenCalledWith({
    type: 'VMResume',
    payload: expect.anything(),
  });
});

it('should start a vm (parallel test)', async () => {
  await createVM('stopped');
  await Promise.all([
    execContract(assignVM, {}, 'user1_token'),
    execContract(assignVM, {}, 'user1_token'),
  ]);
  expect(mockedDispatchTask).toHaveBeenCalledTimes(1);
});
