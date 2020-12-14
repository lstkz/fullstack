import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { getPreparedTaskData } from './prepareFolder';

export const checkFolderStatus = createContract('vm.checkFolderStatus')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<{ isReady: boolean }>()
  .fn(async (user, moduleId, taskId) => {
    const { preparedTask } = await getPreparedTaskData(
      user._id,
      moduleId,
      taskId
    );
    return {
      isReady: !!preparedTask,
    };
  });

export const checkFolderStatusRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.checkFolderStatus',
  handler: checkFolderStatus,
});
