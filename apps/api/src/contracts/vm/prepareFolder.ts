import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from '../module/getTask';

export const prepareFolder = createContract('vm.prepareFolder')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<{ url: string }>()
  .fn(async (user, moduleId, taskId) => {
    const assignedVM = await AssignedVMCollection.findOne({
      userId: user._id,
    });
    if (!assignedVM || !assignedVM.isReady) {
      throw new AppError('VM is not ready');
    }
    const task = await getActiveTask(moduleId, taskId);
    const folderPath = `/home/ubuntu/${moduleId}/${taskId}`;
    return {
      url: `https://${assignedVM.domain!}/?folderPath=${folderPath}`,
    };
  });

export const prepareFolderRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.prepareFolder',
  handler: prepareFolder,
});
