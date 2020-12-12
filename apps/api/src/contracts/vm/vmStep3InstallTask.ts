import { S } from 'schema';
import { createContract, createTaskBinding } from '../../lib';

export const vmStep3Install = createContract('vm.vmStep3Install')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .fn(async vmId => {
    // TODO
  });

export const vmStep3InstallTask = createTaskBinding({
  type: 'VMStep3Install',
  async handler(messageId, task) {
    await vmStep3Install(task.vmId);
  },
});
