import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { getDefaultVMId, randomString } from '../../common/helper';
import { dispatchTask } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';

export const assignVM = createContract('vm.assignVM')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<{ isReady: boolean }>()
  .fn(async user => {
    const vmId = getDefaultVMId(user);
    const { value: vm } = await AssignedVMCollection.findOneAndUpdate(
      {
        _id: vmId,
      },
      {
        $setOnInsert: {
          tagId: randomString(15).toLowerCase(),
          userId: user._id,
          isReady: false,
          lastPingTime: new Date(),
        },
      },
      {
        upsert: true,
      }
    );
    if (!vm) {
      await dispatchTask({
        type: 'VMStep1Create',
        payload: {
          vmId,
        },
      });
      return { isReady: false };
    }
    if (vm.status === 'stopped') {
      const { value: updated } = await AssignedVMCollection.findOneAndUpdate(
        {
          _id: vmId,
          status: 'stopped',
        },
        {
          $set: {
            status: 'resuming',
          },
        }
      );
      if (updated) {
        await dispatchTask({
          type: 'ResumeVM',
          payload: {
            vmId,
          },
        });
      }
    }
    return { isReady: vm.status === 'running' };
  });

export const assignVMRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.assignVM',
  handler: assignVM,
});
