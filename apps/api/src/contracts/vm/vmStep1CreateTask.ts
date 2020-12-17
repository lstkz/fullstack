import { config } from 'config';
import { S } from 'schema';
import { createContract, createTaskBinding } from '../../lib';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { getInstanceByTag, runInstance } from '../../common/aws-helper';
import { dispatchTask } from '../../dispatch';

export const vmStep1Create = createContract('vm.vmStep1Create')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .returns<void>()
  .fn(async vmId => {
    const assignedVM = await AssignedVMCollection.findByIdOrThrow(vmId);
    let instance = await getInstanceByTag('fsID', assignedVM.tagId);

    if (!instance) {
      instance = await runInstance({
        LaunchTemplate: {
          LaunchTemplateId: config.vm.launchTemplateId,
        },
        SubnetId: config.vm.subnetId,
        TagSpecifications: [
          {
            ResourceType: 'instance',
            Tags: [
              {
                Key: 'Name',
                Value: config.vm.awsName,
              },
              {
                Key: 'UserVM',
                Value: '',
              },
              {
                Key: 'fsID',
                Value: assignedVM.tagId,
              },
              {
                Key: 'userId',
                Value: assignedVM.userId.toHexString(),
              },
            ],
          },
        ],
        ClientToken: assignedVM.tagId,
      });
    }
    assignedVM.awsId = instance.InstanceId;
    assignedVM.launchTime = instance.LaunchTime;
    await AssignedVMCollection.update(assignedVM, ['awsId', 'launchTime']);
    await dispatchTask({
      type: 'VMStep2AssignDomainTask',
      payload: { vmId },
    });
  });

export const vmStep1CreateTask = createTaskBinding({
  type: 'VMStep1Create',
  async handler(messageId, task) {
    await vmStep1Create(task.vmId);
  },
});
