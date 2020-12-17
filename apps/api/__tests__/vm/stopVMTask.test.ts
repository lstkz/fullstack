import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { getInstanceById, stopInstance } from '../../src/common/aws-helper';
import { stopVMTask } from '../../src/contracts/vm/stopVmTask';
import { setupDb } from '../helper';
import { createModules, createVM, registerSampleUsers } from '../seed-data';

jest.mock('../../src/dispatch');
jest.mock('../../src/common/aws-helper');

const mocked_getInstanceById = mocked(getInstanceById);
const mocked_stopInstance = mocked(stopInstance);

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  mocked_getInstanceById.mockReset();
  mocked_stopInstance.mockReset();
});

it('should ignore if not stopping', async () => {
  await createVM('stopped', '100');
  await stopVMTask.options.handler('123', { vmId: '100' });
  expect(mocked_stopInstance).not.toBeCalled();
});

it('should stop', async () => {
  mocked_getInstanceById
    .mockImplementationOnce(async () => ({}))
    .mockImplementationOnce(async () => ({
      State: {
        Name: 'stopped',
      },
    }));
  await createVM('stopping', '100');
  await stopVMTask.options.handler('123', { vmId: '100' });
  expect(mocked_getInstanceById).toBeCalledTimes(2);
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.status).toEqual('stopped');
});
