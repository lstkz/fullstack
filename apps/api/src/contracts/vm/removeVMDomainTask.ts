import { config } from 'config';
import { S } from 'schema';
import { getZoneRecord, removeZoneRecord } from '../../common/aws-helper';
import { createContract, createTaskBinding } from '../../lib';

export const removeVMDomain = createContract('vm.removeVMDomain')
  .params('domain')
  .schema({
    domain: S.string(),
  })
  .fn(async domain => {
    const zoneRecord = await getZoneRecord(config.vm.zoneId, domain);
    if (!zoneRecord) {
      return;
    }
    await removeZoneRecord(config.vm.zoneId, domain);
  });

export const removeVMDomainTask = createTaskBinding({
  type: 'RemoveVMDomain',
  async handler(messageId, { domain }) {
    await removeVMDomain(domain);
  },
});
