import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { getCurrentDate, getDefaultVMId } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';

export const pingVM = createContract('vm.pingVM')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .fn(async user => {
    const vmId = getDefaultVMId(user);
    await AssignedVMCollection.findOneAndUpdate(
      { _id: vmId, status: 'running' },
      { $set: { lastPingTime: getCurrentDate() } }
    );
  });

export const pingVMRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.pingVM',
  handler: pingVM,
});
