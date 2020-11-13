import { randomSalt, createPasswordHash } from '../../common/helper';
import uuid from 'uuid';
import { createUserCUD } from '../../cud/user';

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
