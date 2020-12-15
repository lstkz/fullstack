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
    const updateResult = await AssignedVMCollection.findOneAndUpdate(
      {
        _id: vmId,
      },
      {
        $setOnInsert: {
          tagId: randomString(15).toLowerCase(),
          userId: user._id,
          isReady: false,
        },
      },
      {
        upsert: true,
      }
    );
    if (!updateResult.value) {
      await dispatchTask({
        type: 'VMStep1Create',
        payload: {
          vmId,
        },
      });
    }
    return { isReady: updateResult.value?.isReady ?? false };
  });

export const assignVMRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.assignVM',
  handler: assignVM,
});
