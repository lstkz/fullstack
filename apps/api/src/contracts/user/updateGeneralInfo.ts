import { S } from 'schema';
import { getCustomerSchema } from 'shared';
import { UserCollection } from '../../collections/User';
import { createContract, createRpcBinding } from '../../lib';

export const updateGeneralInfo = createContract('user.updateGeneralInfo')
  .params('user', 'info')
  .schema({
    user: S.object().appUser(),
    info: getCustomerSchema(),
  })
  .fn(async (appUser, info) => {
    await UserCollection.findOneAndUpdate(
      {
        _id: appUser._id,
      },
      {
        $set: {
          info,
        },
      }
    );
  });

export const updateGeneralInfoRpc = createRpcBinding({
  injectUser: true,
  signature: 'user.updateGeneralInfo',
  handler: updateGeneralInfo,
});
