import { S } from 'schema';
import * as DateFns from 'date-fns';
import { AssignedVMCollection } from '../../collections/AssignedVM';
import { DomainCertCollection } from '../../collections/DomainCert';
import { createContract, createTaskBinding } from '../../lib';
import { setupVM } from '../../common/vm-helper';
import { config } from 'config';

export const vmStep3Install = createContract('vm.vmStep3Install')
  .params('vmId')
  .schema({
    vmId: S.string(),
  })
  .fn(async vmId => {
    const assignedVM = await AssignedVMCollection.findByIdOrThrow(vmId);
    const domain = config.vm.baseDomain;
    const cert = await DomainCertCollection.findOne(
      {
        domain,
      },
      {
        sort: {
          expiresAt: -1,
        },
      }
    );
    if (!cert) {
      throw new Error('Cert not configured for domain: ' + domain);
    }
    if (DateFns.isBefore(cert.expiresAt, DateFns.addMonths(new Date(), 1))) {
      throw new Error('Cert almost expired for domain: ' + domain);
    }

    await setupVM({
      cert: cert.cert,
      certKey: cert.certKey,
      domainName: assignedVM.domain!,
      instanceId: assignedVM.awsId!,
    });
    assignedVM.lastPingTime = new Date();
    assignedVM.status = 'running';
    await AssignedVMCollection.update(assignedVM, ['status', 'lastPingTime']);
  });

export const vmStep3InstallTask = createTaskBinding({
  type: 'VMStep3Install',
  async handler(messageId, task) {
    await vmStep3Install(task.vmId);
  },
});
