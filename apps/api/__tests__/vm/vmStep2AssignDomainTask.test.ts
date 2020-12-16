import { mocked } from 'ts-jest/utils';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import {
  createZoneRecord,
  getInstanceById,
  getZoneChangeStatus,
  getZoneRecord,
} from '../../src/common/aws-helper';
import { vmStep2AssignDomainTask } from '../../src/contracts/vm/vmStep2AssignDomainTask';
import { dispatchTask } from '../../src/dispatch';
import { getId, setupDb } from '../helper';
import { createModules, registerSampleUsers } from '../seed-data';

jest.mock('../../src/dispatch');
jest.mock('../../src/common/aws-helper');

const mocked_dispatchTask = mocked(dispatchTask);
const mocked_getInstanceById = mocked(getInstanceById);
const mocked_createZoneRecord = mocked(createZoneRecord);
const mocked_getZoneChangeStatus = mocked(getZoneChangeStatus);
const mocked_getZoneRecord = mocked(getZoneRecord);

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  await AssignedVMCollection.insertOne({
    _id: `100`,
    tagId: '123',
    userId: getId(1),
    status: 'creating',
    awsId: '1010',
    launchTime: new Date(0),
  });
  mocked_dispatchTask.mockReset();
  mocked_getInstanceById.mockReset();
  mocked_createZoneRecord.mockReset();
  mocked_getZoneChangeStatus.mockReset();
  mocked_getZoneRecord.mockReset();
  mocked_getInstanceById.mockImplementation(async () => ({
    PublicIpAddress: '1.1.1.1',
  }));
  mocked_createZoneRecord.mockImplementation(async () => 'change-abc');
  mocked_getZoneChangeStatus.mockImplementation(async () => 'INSYNC');
});

it('should assign domain', async () => {
  await vmStep2AssignDomainTask.options.handler('123', { vmId: '100' });

  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.ip).toEqual('1.1.1.1');
  expect(vm?.domain).toBeTruthy();
  expect(vm?.zoneChangeId).toEqual('change-abc');
});

it('should assign domain (ip already assigned)', async () => {
  await AssignedVMCollection.findOneAndUpdate({}, { $set: { ip: '2.2.2.2' } });
  await vmStep2AssignDomainTask.options.handler('123', { vmId: '100' });
  expect(mocked_getInstanceById).not.toHaveBeenCalled();
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.ip).toEqual('2.2.2.2');
});

it('should assign domain (domainPrefix already assigned)', async () => {
  await AssignedVMCollection.findOneAndUpdate(
    {},
    {
      $set: {
        ip: '2.2.2.2',
        domainPrefix: 'pp',
        baseDomain: 'example.org',
        domain: 'pp.example.org',
      },
    }
  );
  await vmStep2AssignDomainTask.options.handler('123', { vmId: '100' });
  expect(mocked_getInstanceById).not.toHaveBeenCalled();
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.domain).toEqual('pp.example.org');
});

it('should assign domain (zone record already assigned)', async () => {
  mocked_getZoneRecord.mockImplementation(async () => ({
    Name: 'name',
    Type: 'type',
    ResourceRecords: [{ Value: '1.1.1.1' }],
  }));
  await vmStep2AssignDomainTask.options.handler('123', { vmId: '100' });
  expect(mocked_createZoneRecord).not.toHaveBeenCalled();
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.zoneChangeId).toBeFalsy();
});

it('should throw if cannot get ip', async () => {
  mocked_getInstanceById.mockImplementation(async () => ({
    PublicIpAddress: undefined,
  }));
  await expect(
    vmStep2AssignDomainTask.options.handler('123', { vmId: '100' })
  ).rejects.toThrow('Cannot get instance ip for 1010');
});

it('should throw if zone timeout', async () => {
  mocked_getZoneChangeStatus.mockImplementation(async () => 'PENDING');
  await expect(
    vmStep2AssignDomainTask.options.handler('123', { vmId: '100' })
  ).rejects.toThrow('Wait for zone change timeout change-abc');
});

it('should throw if domain exists with different ip', async () => {
  mocked_getZoneRecord.mockImplementation(async () => ({
    Name: 'name',
    Type: 'type',
    ResourceRecords: [{ Value: '2.2.1.1' }],
  }));
  await expect(
    vmStep2AssignDomainTask.options.handler('123', { vmId: '100' })
  ).rejects.toThrow('Record already existing with different ip');
});
