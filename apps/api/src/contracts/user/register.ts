import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';
import { _createUser } from './_createUser';
import { _generateAuthData } from './_generateAuthData';
import { AuthData, getPasswordSchema } from 'shared';
import { CourseActivationCodeEntity } from '../../entities/CourseActivationCodeEntity';
import { AppError } from '../../common/errors';
import { UsedCourseActivationCodeEntity } from '../../entities/UsedCourseActivationCodeEntity';
import { activateCourse } from '../activation/activateCourse';

async function _checkCodeUsed(code: string) {
  const [activationCode, usedActivationCode] = await Promise.all([
    CourseActivationCodeEntity.getByKeyOrNull({
      code,
    }),
    UsedCourseActivationCodeEntity.getByKeyOrNull({
      code,
    }),
  ]);
  if (!activationCode || usedActivationCode) {
    throw new AppError('invalid activation code');
  }
}

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
    await _checkCodeUsed(values.activationCode);
    const user = await _createUser({
      ...values,
      isVerified: true,
    });
    await activateCourse(user.userId, values.activationCode);
    return _generateAuthData(user);
  });

export const registerRpc = createRpcBinding({
  public: true,
  signature: 'user.register',
  handler: register,
});
