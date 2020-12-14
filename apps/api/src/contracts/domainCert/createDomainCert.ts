import { S } from 'schema';
import { DomainCertCollection } from '../../collections/DomainCert';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const createDomainCert = createContract('domainCert.createDomainCert')
  .params('values')
  .schema({
    values: S.object().keys({
      expiresAt: S.date(),
      cert: S.string(),
      certKey: S.string(),
      domain: S.string(),
    }),
  })
  .returns<void>()
  .fn(async values => {
    if (values.expiresAt.getTime() < Date.now()) {
      throw new AppError('expiresAt must be a future date');
    }
    await DomainCertCollection.insertOne({
      ...values,
      createdAt: new Date(),
    });
  });

export const createDomainCertRpc = createRpcBinding({
  admin: true,
  signature: 'domainCert.createDomainCert',
  handler: createDomainCert,
});
