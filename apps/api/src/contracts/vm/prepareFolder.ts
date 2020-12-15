import { ObjectId } from 'mongodb';
import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { PreparedTaskCollection } from '../../collections/PreparedTask';
import { AppError } from '../../common/errors';
import { getPreparedTaskId } from '../../common/helper';
import { dispatchTask } from '../../dispatch';
import { createContract, createRpcBinding } from '../../lib';
import { getActiveTask } from '../module/getTask';

export const prepareFolder = createContract('vm.prepareFolder')
  .params('user', 'moduleId', 'taskId')
  .schema({
    user: S.object().appUser(),
    moduleId: S.string(),
    taskId: S.number(),
  })
  .returns<{ url: string | null }>()
  .fn(async (user, moduleId, taskId) => {
    const assignedVM = await AssignedVMCollection.findOne({
      userId: user._id,
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
    const {
      value: preparedTask,
    } = await PreparedTaskCollection.findOneAndUpdate(
      {
        _id: preparedTaskId,
      },
      {
        $setOnInsert: {
          _id: preparedTaskId,
        },
      },
      {
        upsert: true,
      }
    );
    if (!preparedTask) {
      await dispatchTask({
        type: 'PrepareFolder',
        payload: {
          assignedVMId: assignedVM._id,
          userId: user._id.toHexString(),
          moduleId,
          taskId,
        },
      });
    }
    if (preparedTask?.folderPath) {
      return {
        url: `https://${assignedVM.domain!}/#${preparedTask.folderPath}`,
      };
    }
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
