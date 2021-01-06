import { S } from 'schema';
import { CustomerInfo } from 'shared';
import { UserCollection } from '../../collections/User';
import { createContract, createRpcBinding } from '../../lib';

export const getGeneralInfo = createContract('user.getGeneralInfo')
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<CustomerInfo | null>()
  .fn(async appUser => {
    const user = await UserCollection.findByIdOrThrow(appUser._id);
    return user.info ?? null;
  });

export const getGeneralInfoRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.getGeneralInfo',
  handler: getGeneralInfo,
});
