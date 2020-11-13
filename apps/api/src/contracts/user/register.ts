import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { dispatch } from '../../dispatch';
import { _generateAuthData } from './_generateAuthData';
import { AuthData, getPasswordSchema } from 'shared';

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
    const user = await _createUser({
      ...values,
      isVerified: false,
    });

    await dispatch({
      type: 'UserRegisteredEvent',
      payload: {
        userId: user.userId,
      },
    });

    return _generateAuthData(user);
  });

export const registerRpc = createRpcBinding({
  public: true,
  signature: 'user.register',
  handler: register,
});
