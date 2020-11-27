import { apiMapping } from './generated/api-mapping';
import { AppError } from './common/errors';
import { getUserByToken } from './contracts/user/getUserByToken';
import { ADMIN_TOKEN } from './config';

export async function handler(
  rpcMethod: string,
  rpcBody: any,
  authToken: string | null | undefined
) {
  const getFn = apiMapping[rpcMethod];
  if (!getFn) {
    throw new AppError('RPC Method not found: ' + rpcMethod);
  }
  const { options } = await getFn();

  if (!options.public && !authToken) {
    throw new AppError('authToken required');
  }

  const getUser = async () => {
    if (options.admin) {
      if (!ADMIN_TOKEN || authToken !== ADMIN_TOKEN) {
        throw new AppError('Admin only');
      }
      return null;
    }
    if (!authToken) {
      return null;
    }
    const user = await getUserByToken(authToken);
    if (!user) {
      throw new AppError('Invalid or expired token');
    }
    if (!user.isVerified) {
      throw new AppError('User is not verified');
    }
    return user;
  };
  const user = await getUser();
  const params = options.handler.getParams();
  if (options.injectUser) {
    params.shift();
  }
  const values = params.map(x => rpcBody[x]);
  if (options.injectUser) {
    values.unshift(user?.id);
  }
  return options.handler(...values);
}
