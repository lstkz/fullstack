import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AppError } from '../../common/errors';
import { createPasswordHash } from '../../common/helper';
import { AuthData } from 'shared';
import { UserCollection } from '../../collections/User';

const INVALID_CRED = 'Invalid credentials or user not found';

export const login = createContract('user.login')
  .params('values')
  .schema({
    values: S.object().keys({
      email: S.string().email().trim(),
      password: S.string(),
    }),
  })
  .returns<AuthData>()
  .fn(async values => {
    const { email } = values;
    if (email === 'simulateError' && values.password === 'simulateError') {
      throw new Error('Simulate internal error');
    }
    const user = await UserCollection.findOneByEmail(email);
    if (!user) {
      throw new AppError(INVALID_CRED);
    }
    const hash = await createPasswordHash(values.password, user.salt);
    if (user.password !== hash) {
      throw new AppError(INVALID_CRED);
    }
    return _generateAuthData(user);
  });

export const loginRpc = createRpcBinding({
  public: true,
  signature: 'user.login',
  handler: login,
});
