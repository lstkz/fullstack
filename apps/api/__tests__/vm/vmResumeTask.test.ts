import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { getInstanceById, resumeInstance } from '../../src/common/aws-helper';
import { vmResumeTask } from '../../src/contracts/vm/vmResumeTask';
import { setupDb } from '../helper';
import { createModules, createVM, registerSampleUsers } from '../seed-data';

jest.mock('../../src/dispatch');
jest.mock('../../src/common/aws-helper');

const mocked_getInstanceById = mocked(getInstanceById);
const mocked_resumeInstance = mocked(resumeInstance);

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  mocked_getInstanceById.mockReset();
  mocked_resumeInstance.mockReset();
});

it('should ignore if not stopped', async () => {
  await createVM('running', '100');
  await vmResumeTask.options.handler('123', { vmId: '100' });
  expect(mocked_resumeInstance).not.toBeCalled();
});

it('should resume', async () => {
  mocked_getInstanceById
    .mockImplementationOnce(async () => ({}))
    .mockImplementationOnce(async () => ({
      State: {
        Name: 'running',
      },
    }));
  await createVM('stopped', '100');
  await vmResumeTask.options.handler('123', { vmId: '100' });
  expect(mocked_getInstanceById).toBeCalledTimes(2);
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.status).toEqual('running');
});
