import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { checkIdleVMsTask } from '../../src/contracts/vm/checkIdleVMsTask';
import { dispatchTask } from '../../src/dispatch';
import { getId, setupDb } from '../helper';
import { createModules, registerSampleUsers } from '../seed-data';

setupDb();

jest.mock('../../src/dispatch');

const mockedDispatchTask = mocked(dispatchTask);

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  await AssignedVMCollection.insertOne({
    _id: `100`,
    tagId: '123',
    userId: getId(1),
    status: 'creating',
  });
  mockedDispatchTask.mockReset();
});

async function createVm(
  id: string,
  status: 'running' | 'stopped',
  lastPingTime: Date
) {
  await AssignedVMCollection.insertOne({
    _id: id,
    tagId: `tag_${id}`,
    userId: getId(1),
    status: status,
    lastPingTime,
  });
}

it('should stop a vm', async () => {
  await Promise.all([
    createVm('1', 'running', new Date(0)),
    createVm('2', 'running', new Date()),
  ]);
  await checkIdleVMsTask.options.handler('123', { vmId: '100' });

  expect(mockedDispatchTask).toBeCalledTimes(1);
  expect(mockedDispatchTask).toBeCalledWith({
    type: 'VMStop',
    payload: {
      vmId: '1',
    },
  });
  const vm1 = await AssignedVMCollection.findByIdOrThrow('1');
  const vm2 = await AssignedVMCollection.findByIdOrThrow('2');
  expect(vm1.status).toEqual('stopping');
  expect(vm2.status).toEqual('running');
});

it('should stop multiple vms', async () => {
  await Promise.all([
    createVm('1', 'running', new Date(1)),
    createVm('2', 'running', new Date(2)),
    createVm('3', 'running', new Date(3)),
    createVm('4', 'running', new Date()),
    createVm('5', 'stopped', new Date(1)),
  ]);
  await checkIdleVMsTask.options.handler('123', { vmId: '100' });

  expect(mockedDispatchTask).toBeCalledTimes(3);
});
