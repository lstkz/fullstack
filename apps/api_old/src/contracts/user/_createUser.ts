import { randomSalt, createPasswordHash } from '../../common/helper';
import uuid from 'uuid';
import { createUserCUD } from '../../cud/user';
import { _checkCodeUsed } from '../activation/_checkCodeUsed';
import { activateCourse } from '../activation/activateCourse';
import { _generateAuthData } from './_generateAuthData';

interface CreateUserValues {
  userId?: string;
  email: string;
  password: string;
  isVerified: boolean;
  githubId?: number;
}

export async function _createUser(values: CreateUserValues) {
  const userId = values.userId || uuid();
  const salt = await randomSalt();
  const password = await createPasswordHash(values.password, salt);
  const user = await createUserCUD({
    userId: userId,
    email: values.email,
    salt: salt,
    password: password,
    isVerified: values.isVerified,
    githubId: values.githubId,
  });
  return user;
}

export async function _createUserWithActivation(
  activationCode: string,
  values: CreateUserValues
) {
  await _checkCodeUsed(activationCode);
  const user = await _createUser(values);
  await activateCourse(user.userId, activationCode);
  return _generateAuthData(user);
}
