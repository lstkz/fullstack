import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { getInstanceById, resumeInstance } from '../../src/common/aws-helper';
import { assignDomain } from '../../src/contracts/vm/assignDomain';
import { resumeVMTask } from '../../src/contracts/vm/resumeVMTask';
import { setupDb } from '../helper';
import { createModules, createVM, registerSampleUsers } from '../seed-data';

jest.mock('../../src/dispatch');
jest.mock('../../src/common/aws-helper');
jest.mock('../../src/contracts/vm/assignDomain');

const mocked_getInstanceById = mocked(getInstanceById);
const mocked_resumeInstance = mocked(resumeInstance);
const mocked_assignDomain = mocked(assignDomain);

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  mocked_getInstanceById.mockReset();
  mocked_resumeInstance.mockReset();
  mocked_assignDomain.mockReset();
});

it('should ignore if not stopped', async () => {
  await createVM('running', '100');
  await resumeVMTask.options.handler('123', { vmId: '100' });
  expect(mocked_resumeInstance).not.toBeCalled();
  expect(mocked_assignDomain).not.toBeCalled();
});

it('should resume', async () => {
  mocked_getInstanceById
    .mockImplementationOnce(async () => ({}))
    .mockImplementationOnce(async () => ({
      State: {
        Name: 'running',
      },
    }));
  await createVM('resuming', '100');
  await resumeVMTask.options.handler('123', { vmId: '100' });
  expect(mocked_assignDomain).toBeCalledTimes(1);
  expect(mocked_getInstanceById).toBeCalledTimes(2);
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.status).toEqual('running');
});
