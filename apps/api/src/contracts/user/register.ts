import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AuthData, getPasswordSchema } from 'shared';

export const register = createContract('user.register')
  .params('values')
  .schema({
    values: S.object().keys({
      email: S.string().email().trim(),
      password: getPasswordSchema(),
      subscribeNewsletter: S.boolean(),
    }),
  })
  .returns<AuthData>()
  .fn(async values => {
    const user = await _createUser(
      {
        ...values,
        isVerified: false,
      },
      true
    );
    return _generateAuthData(user);
  });

export const registerRpc = createRpcBinding({
  public: true,
  signature: 'user.register',
  handler: register,
});
