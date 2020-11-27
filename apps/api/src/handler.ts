import { apiMapping } from './generated/api-mapping';
import { AppError } from './common/errors';
import { getUserByToken } from './contracts/user/getUserByToken';

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
    if (!authToken) {
      return null;
    }
    const user = await getUserByToken(authToken);
    if (!user) {
      throw new AppError('Invalid or expired token');
    }
    if (options.admin && !user.isAdmin) {
      throw new AppError('Admin only');
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
