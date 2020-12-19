import { getSolutionUploadUrl } from '../../src/contracts/module/getSolutionUploadUrl';
import { s3 } from '../../src/lib';
import { execContract, setupDb } from '../helper';
import { addSubscription, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await addSubscription(1);
});

it('should throw if not pro', async () => {
  await expect(
    execContract(getSolutionUploadUrl, {}, 'user2_token')
  ).rejects.toThrow('Subscription required');
});

it('should return data', async () => {
  s3.createPresignedPost = () => ({
    url: 'http://example.org',
    fields: {
      Policy: 'policy',
      'X-Amz-Signature': 'sig',
      foo: 'bar',
    },
  });
  const ret = await execContract(getSolutionUploadUrl, {}, 'user1_token');
  expect(ret.key).toBeTruthy();
  ret.key = 'mocked';
  expect(ret).toMatchInlineSnapshot(`
    Object {
      "fields": Object {
        "Policy": "policy",
        "X-Amz-Signature": "sig",
        "foo": "bar",
      },
      "key": "mocked",
      "url": "http://example.org",
    }
  `);
});
