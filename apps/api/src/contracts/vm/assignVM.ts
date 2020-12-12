import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { dispatchTask } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';

export const assignVM = createContract('vm.assignVM')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .fn(async user => {
    const vmId = `default-${user._id}`;
    let assignedVm = await AssignedVMCollection.findById(vmId);
    if (assignedVm) {
      throw new Error('TODO');
    }
    assignedVm = {
      _id: vmId,
      userId: user._id,
    };
    await AssignedVMCollection.insertOne(assignedVm);
    await dispatchTask({
      type: 'VMStep1Create',
      payload: {
        vmId,
      },
    });
  });

export const assignVMRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.assignVM',
  handler: assignVM,
});
