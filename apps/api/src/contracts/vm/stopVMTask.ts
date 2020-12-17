import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { getInstanceById, stopInstance } from '../../common/aws-helper';
import { createWaiter } from '../../common/helper';
import { createContract, createTaskBinding } from '../../lib';

async function _waitForStopped(awsId: string) {
  return createWaiter(async () => {
    const instance = await getInstanceById(awsId);
    if (instance.State?.Name === 'stopped') {
      return { ok: true, result: undefined };
    }
    return { ok: false };
  }, `Wait for stopped timeout ${awsId}`);
}

export const vmStop = createContract('vm.vmStop')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .fn(async vmId => {
    const assignedVM = await AssignedVMCollection.findByIdOrThrow(vmId);
    if (assignedVM.status !== 'stopping') {
      return;
    }
    await stopInstance(assignedVM.awsId!);
    await _waitForStopped(assignedVM.awsId!);
    assignedVM.status = 'stopped';
    assignedVM.ip = null;
    assignedVM.domainPrefix = null;
    assignedVM.domain = null;
    assignedVM.baseDomain = null;
    assignedVM.zoneChangeId = null;
    await AssignedVMCollection.update(assignedVM, [
      'status',
      'ip',
      'domainPrefix',
      'domain',
      'baseDomain',
      'zoneChangeId',
    ]);
  });

export const stopVMTask = createTaskBinding({
  type: 'StopVM',
  async handler(messageId, task) {
    await vmStop(task.vmId);
  },
});
