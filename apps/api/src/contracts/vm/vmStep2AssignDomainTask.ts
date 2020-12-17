import { S } from 'schema';
import { createContract, createTaskBinding } from '../../lib';
import { dispatchTask } from '../../dispatch';
import { assignDomain } from './assignDomain';

export const vmStep2AssignDomain = createContract('vm.vmStep2AssignDomainTask')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .returns<void>()
  .fn(async vmId => {
    await assignDomain(vmId);
    await dispatchTask({
      type: 'VMStep3Install',
      payload: { vmId },
    });
  });

export const vmStep2AssignDomainTask = createTaskBinding({
  type: 'VMStep2AssignDomainTask',
  async handler(messageId, task) {
    await vmStep2AssignDomain(task.vmId);
  },
});
