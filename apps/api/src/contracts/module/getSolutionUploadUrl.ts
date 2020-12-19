import { config } from 'config';
import { S } from 'schema';
import { getCurrentDate, randomString } from '../../common/helper';
import { createContract, createRpcBinding, s3 } from '../../lib';

export const getSolutionUploadUrl = createContract(
  'module.getSolutionUploadUrl'
)
  .params('user')
  .schema({
    user: S.object().appUser(),
  })
  .returns<{ url: string; key: string; fields: Record<string, string> }>()
  .fn(async user => {
    const now = getCurrentDate();
    const key = [
      'solutions',
      user._id.toHexString(),
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      `${randomString(20)}.tar.gz`,
    ].join('/');
    const { url, fields } = s3.createPresignedPost({
      Bucket: config.aws.s3Bucket,
      Fields: {
        key: key,
      },
      Conditions: [['content-length-range', 1, 10 * 1024 * 1024]],
    });
    return { url, key, fields };
  });

export const getSolutionUploadUrlRpc = createRpcBinding({
  injectUser: true,
  pro: true,
  signature: 'module.getSolutionUploadUrl',
  handler: getSolutionUploadUrl,
});
