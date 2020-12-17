import * as DateFns from 'date-fns';
import { config } from 'config';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { createContract, createTaskBinding } from '../../lib';
import { getCurrentDate } from '../../common/helper';
import { dispatchTask } from '../../dispatch';

export const checkIdleVMs = createContract('vm.checkIdleVMs')
  .params()
  .returns<void>()
  .fn(async () => {
    const date = DateFns.addMilliseconds(
      getCurrentDate(),
      -config.vm.stopTimeoutMs
    );
    const vms = await AssignedVMCollection.findAll({
      status: 'running',
      lastPingTime: {
        $lt: date,
      },
    });
    for (const vm of vms) {
      vm.status = 'stopping';
      await AssignedVMCollection.update(vm, ['status']);
      await dispatchTask({
        type: 'StopVM',
        payload: {
          vmId: vm._id,
        },
      });
    }
  });

export const checkIdleVMsTask = createTaskBinding({
  type: 'CheckIdleVms',
  async handler() {
    await checkIdleVMs();
  },
});
