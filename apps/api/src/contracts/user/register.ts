import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AuthData, getPasswordSchema } from 'shared';
import { config } from 'config';

export const register = createContract('user.register')
  .params('values')
  .schema({
    values: S.object().keys({
      email: S.string().email().trim(),
      password: getPasswordSchema(),
    }),
  })
  .returns<AuthData>()
  .fn(async values => {
    if (config.disableApp) {
      throw new Error('disabled');
    }
    const user = await _createUser({
      ...values,
      isVerified: false,
    });
    return _generateAuthData(user);
  });

export const registerRpc = createRpcBinding({
  public: true,
  signature: 'user.register',
  handler: register,
});
