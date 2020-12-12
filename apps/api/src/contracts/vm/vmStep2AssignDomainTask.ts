import { config } from 'config';
import { S } from 'schema';
import { createContract, createTaskBinding } from '../../lib';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import {
  createZoneRecord,
  getInstanceById,
  getZoneChangeStatus,
  getZoneRecord,
} from '../../common/aws-helper';
import { delay, randomString } from '../../common/helper';

async function _getInstanceIP(instanceId: string, retry = 0): Promise<string> {
  if (retry > 120) {
    throw new Error(`Cannot get instance ip for ${instanceId}`);
  }
  const instance = await getInstanceById(instanceId);
  if (instance.PublicIpAddress) {
    return instance.PublicIpAddress;
  }
  await delay(1000);
  return _getInstanceIP(instanceId, retry + 1);
}

async function _waitForZoneChange(changeId: string, retry = 0): Promise<void> {
  if (retry > 120) {
    throw new Error(`Wait for zone change timeout ${changeId}`);
  }
  const status = await getZoneChangeStatus(changeId);
  if (status === 'INSYNC') {
    return;
  }
  await delay(1000);
  return _waitForZoneChange(changeId, retry + 1);
}

async function _checkHasZoneRecord(domain: string, ip: string) {
  const existing = await getZoneRecord(config.vm.zoneId, domain);
  if (!existing) {
    return false;
  }
  const isCorrect = existing.ResourceRecords?.some(x => x.Value === ip);
  if (!isCorrect) {
    throw new Error(`Record already existing with different ip for ${domain}`);
  }
  return true;
}

export const vmStep2AssignDomain = createContract('vm.vmStep2AssignDomainTask')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .returns<void>()
  .fn(async vmId => {
    const assignedVM = await AssignedVMCollection.findByIdOrThrow(vmId);
    if (!assignedVM.awsId) {
      throw new Error('awsId is not set');
    }
    if (!assignedVM.ip) {
      assignedVM.ip = await _getInstanceIP(assignedVM.awsId);
      await AssignedVMCollection.update(assignedVM, ['ip']);
    }
    if (!assignedVM.domainPrefix) {
      assignedVM.domainPrefix = randomString(15).toLowerCase();
      const domain = `${assignedVM.domainPrefix}.${config.vm.baseDomain}`;
      assignedVM.domain = domain;
      await AssignedVMCollection.update(assignedVM, ['domain', 'domainPrefix']);
    }
    const domain = assignedVM.domain!;
    const hasRecord = await _checkHasZoneRecord(domain, assignedVM.ip);
    if (!assignedVM.zoneChangeId && !hasRecord) {
      assignedVM.zoneChangeId = await createZoneRecord(
        config.vm.zoneId,
        domain,
        assignedVM.ip
      );
      await AssignedVMCollection.update(assignedVM, ['zoneChangeId']);
    }
    if (assignedVM.zoneChangeId) {
      await _waitForZoneChange(assignedVM.zoneChangeId);
    }
  });

export const vmStep2AssignDomainTask = createTaskBinding({
  type: 'VMStep1Create',
  async handler(messageId, task) {
    await vmStep2AssignDomain(task.vmId);
  },
});
