import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { createContract, createRpcBinding } from '../../lib';

export const checkVmStatus = createContract('vm.checkVmStatus')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<{ isReady: boolean }>()
  .fn(async user => {
    const assignedVM = await AssignedVMCollection.findOne({
      userId: user._id,
    });
    return {
      isReady: assignedVM?.isReady ?? false,
    };
  });

export const checkVmStatusRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.checkVmStatus',
  handler: checkVmStatus,
});
