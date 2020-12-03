import { S } from 'schema';
import uuid from 'uuid';
import { TokenEntity } from '../../entities/TokenEntity';
import { createContract } from '../../lib';

export const createToken = createContract('user.createToken')
  .params('userId', 'fixedToken')
  .schema({
    userId: S.string(),
    fixedToken: S.string().nullable().optional(),
  })
  .returns<string>()
  .fn(async (userId, fixedToken) => {
    const token = new TokenEntity({
      userId,
      token: fixedToken || uuid(),
    });
    await token.insert();

    return token.token;
  });
