import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { randomString } from '../../common/helper';
import { withTransaction } from '../../db';
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
    let isAlreadyCreated = false;
    let isReady = false;
    await withTransaction(async () => {
      let assignedVm = await AssignedVMCollection.findById(vmId);
      if (assignedVm) {
        isAlreadyCreated = true;
        isReady = assignedVm.isReady;
        return;
      }
      assignedVm = {
        _id: vmId,
        tagId: randomString(15).toLowerCase(),
        userId: user._id,
        isReady: false,
      };
      await AssignedVMCollection.insertOne(assignedVm);
    });
    if (!isAlreadyCreated) {
      await dispatchTask({
        type: 'VMStep1Create',
        payload: {
          vmId,
        },
      });
    }
    return { isReady };
  });

export const assignVMRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.assignVM',
  handler: assignVM,
});
