import { ObjectId } from 'mongodb';
import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { PreparedTaskCollection } from '../../collections/PreparedTask';
import { AppError } from '../../common/errors';
import { getPreparedTaskId } from '../../common/helper';
import { dispatchTask } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from '../module/getTask';

export async function getPreparedTaskData(
  userId: ObjectId,
  moduleId: string,
  taskId: number
) {
  const assignedVM = await AssignedVMCollection.findOne({
    userId: userId,
  });
  if (!assignedVM || !assignedVM.isReady) {
    throw new AppError('VM is not ready');
  }
  await getActiveTask(moduleId, taskId);
  const preparedTaskId = getPreparedTaskId({
    awsId: assignedVM.awsId!,
    moduleId,
    taskId,
  });
  const preparedTask = await PreparedTaskCollection.findById(preparedTaskId);

  return {
    preparedTaskId,
    preparedTask,
    assignedVM,
  };
}

export const prepareFolder = createContract('vm.prepareFolder')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<{ url: string | null }>()
  .fn(async (user, moduleId, taskId) => {
    const {
      preparedTaskId,
      preparedTask,
      assignedVM,
    } = await getPreparedTaskData(user._id, moduleId, taskId);
    if (preparedTask) {
      if (!preparedTask.folderPath) {
        return {
          url: null,
        };
      }
      return {
        url: `https://${assignedVM.domain!}/?folder=${preparedTask.folderPath}`,
      };
    }
    await dispatchTask({
      type: 'PrepareFolder',
      payload: {
        assignedVMId: assignedVM._id,
        userId: user._id.toHexString(),
        moduleId,
        taskId,
      },
    });
    await PreparedTaskCollection.insertOne({
      _id: preparedTaskId,
    });
    return {
      url: null,
    };
  });

export const prepareFolderRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'vm.prepareFolder',
  handler: prepareFolder,
});
