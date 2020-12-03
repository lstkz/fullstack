import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser, _createUserWithActivation } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AuthData, getPasswordSchema } from 'shared';
import { _checkCodeUsed } from '../activation/_checkCodeUsed';

export const register = createContract('user.register')
  .params('values')
  .schema({
    values: S.object().keys({
      email: S.string().email().trim(),
      password: getPasswordSchema(),
      activationCode: S.string(),
    }),
  })
  .returns<AuthData>()
  .fn(async values => {
    return _createUserWithActivation(values.activationCode, {
      email: values.email,
      password: values.password,
      isVerified: true,
    });
  });

export const registerRpc = createRpcBinding({
  public: true,
  signature: 'user.register',
  handler: register,
});
