import { config } from 'config';
import { S } from 'schema';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { PreparedTaskCollection } from '../../collections/PreparedTask';
import { getPreparedTaskId } from '../../common/helper';
import { prepareVMFolder } from '../../common/vm-helper';
import { createContract, createTaskBinding, s3 } from '../../lib';
import { getActiveTask } from '../module/getTask';

export const prepareFolder = createContract('vm.prepareFolder')
  .params('values')
  .schema({
    values: S.object().keys({
      assignedVMId: S.string(),
      userId: S.string(),
      moduleId: S.string(),
      taskId: S.number(),
    }),
  })
  .fn(async values => {
    const { moduleId, taskId, assignedVMId } = values;
    const vm = await AssignedVMCollection.findByIdOrThrow(assignedVMId);
    const task = await getActiveTask(moduleId, taskId);
    const downloadUrl = config.cdnBaseUrl + '/' + task.sourceS3Key;
    const folderPath = `/home/ubuntu/${moduleId}/${taskId}`;
    await prepareVMFolder({
      instanceId: vm.awsId!,
      domainName: vm.domain!,
      folderPath,
      downloadUrl,
      setupCommand: 'yarn',
    });
    const preparedTaskId = getPreparedTaskId({
      awsId: vm.awsId!,
      moduleId,
      taskId,
    });
    const preparedTask = await PreparedTaskCollection.findByIdOrThrow(
      preparedTaskId
    );
    preparedTask.folderPath = folderPath;
    preparedTask.preparedAt = new Date();
    await PreparedTaskCollection.update(preparedTask, [
      'folderPath',
      'preparedAt',
    ]);
  });

export const prepareFolderTask = createTaskBinding({
  type: 'PrepareFolder',
  async handler(messageId, payload) {
    await prepareFolder(payload);
  },
});
