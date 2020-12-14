import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { randomString } from '../../common/helper';
import { dispatchTask } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';

export const assignVM = createContract('vm.assignVM')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<{ isReady: boolean }>()
  .fn(async user => {
    const vmId = `default-${user._id}`;
    let assignedVm = await AssignedVMCollection.findById(vmId);
    if (assignedVm) {
      return { isReady: assignedVm.isReady };
    }
    assignedVm = {
      _id: vmId,
      tagId: randomString(15).toLowerCase(),
      userId: user._id,
      isReady: false,
    };
    await AssignedVMCollection.insertOne(assignedVm);
    await dispatchTask({
      type: 'VMStep1Create',
      payload: {
        vmId,
      },
    });
    return { isReady: false };
  });

export const assignVMRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.assignVM',
  handler: assignVM,
});
