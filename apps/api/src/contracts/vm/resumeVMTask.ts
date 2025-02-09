import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { getInstanceById, resumeInstance } from '../../common/aws-helper';
import { createWaiter } from '../../common/helper';
import { createContract, createTaskBinding } from '../../lib';
import { assignDomain } from './assignDomain';

async function _waitForRunning(awsId: string) {
  return createWaiter(async () => {
    const instance = await getInstanceById(awsId);
    if (instance.State?.Name === 'running') {
      return { ok: true, result: undefined };
    }
    return { ok: false };
  }, `Wait for running timeout ${awsId}`);
}

export const resumeVM = createContract('vm.resumeVM')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .fn(async vmId => {
    const assignedVM = await AssignedVMCollection.findByIdOrThrow(vmId);
    if (assignedVM.status !== 'resuming') {
      return;
    }
    await resumeInstance(assignedVM.awsId!);
    await _waitForRunning(assignedVM.awsId!);
    await assignDomain(vmId);
    assignedVM.status = 'running';
    assignedVM.lastPingTime = new Date();
    await AssignedVMCollection.update(assignedVM, ['status', 'lastPingTime']);
  });

export const resumeVMTask = createTaskBinding({
  type: 'ResumeVM',
  async handler(messageId, task) {
    await resumeVM(task.vmId);
  },
});
