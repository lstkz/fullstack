import { config } from 'config';
import { mocked } from 'ts-jest/utils';
import * as DateFns from 'date-fns';
import { AssignedVMCollection } from '../../src/collections/AssignedVM';
import { DomainCertCollection } from '../../src/collections/DomainCert';
import { setupVM } from '../../src/common/vm-helper';
import { vmStep3InstallTask } from '../../src/contracts/vm/vmStep3InstallTask';
import { getId, setupDb } from '../helper';
import { createModules, registerSampleUsers } from '../seed-data';

jest.mock('../../src/common/vm-helper');

const mocked_setupVM = mocked(setupVM);

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await createModules();
  await AssignedVMCollection.insertOne({
    _id: `100`,
    tagId: '123',
    userId: getId(1),
    isReady: false,
    awsId: '1010',
    launchTime: new Date(0),
    domain: 'qq.example.org',
  });
  await DomainCertCollection.insertOne({
    cert: 'cert',
    certKey: 'cert key',
    createdAt: new Date(0),
    domain: config.vm.baseDomain,
    expiresAt: new Date(3000, 1, 1),
  });
  mocked_setupVM.mockReset();
});

it('should install', async () => {
  await vmStep3InstallTask.options.handler('123', { vmId: '100' });
  expect(mocked_setupVM).toBeCalled();
  const vm = await AssignedVMCollection.findOne({});
  expect(vm?.isReady).toEqual(true);
});

it('should throw if no cert configured', async () => {
  await DomainCertCollection.deleteMany({});
  await DomainCertCollection.insertOne({
    cert: 'cert',
    certKey: 'cert key',
    createdAt: new Date(0),
    domain: 'test.example.org',
    expiresAt: new Date(3000, 1, 1),
  });
  await expect(
    vmStep3InstallTask.options.handler('123', { vmId: '100' })
  ).rejects.toThrow('Cert not configured for domain:');
});

it('should throw if almost expired cert', async () => {
  await DomainCertCollection.deleteMany({});
  await DomainCertCollection.insertOne({
    cert: 'cert',
    certKey: 'cert key',
    createdAt: new Date(0),
    domain: config.vm.baseDomain,
    expiresAt: DateFns.addDays(new Date(), 1),
  });
  await expect(
    vmStep3InstallTask.options.handler('123', { vmId: '100' })
  ).rejects.toThrow('Cert almost expired for domain:');
});
