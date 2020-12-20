import { config } from 'config';
import { ModuleCollection } from '../../src/collections/Module';
import { getTaskTestInfo } from '../../src/contracts/module/getTaskTestInfo';
import { execContract, setupDb } from '../helper';
import { addSubscription, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  config.cdnBaseUrl = 'https://example.org';

  await registerSampleUsers();
  await ModuleCollection.insertMany([
    {
      _id: 'm1',
      name: 'module 1',
      description: 'desc 1',
      isPending: false,
      lessons: [],
      tasks: [
        {
          id: 1,
          name: 'task 1',
          isExample: false,
          detailsS3Key: 'details-1.js',
          sourceS3Key: 'source.tar.gz',
          testsInfo: {
            files: [
              {
                hash: 'hash1',
                path: 'path1',
              },
              {
                hash: 'hash2',
                path: 'path2',
              },
            ],
            resultHash: 'hash',
          },
        },
      ],
    },
  ]);
  await addSubscription(1);
});

it('should throw if not pro', async () => {
  await expect(
    execContract(
      getTaskTestInfo,
      {
        moduleId: 'm1',
        taskId: 1,
      },
      'user2_token'
    )
  ).rejects.toThrow('Subscription required');
});

it('should return data', async () => {
  expect(
    await execContract(
      getTaskTestInfo,
      {
        moduleId: 'm1',
        taskId: 1,
      },
      'user1_token'
    )
  ).toMatchInlineSnapshot(`
    Object {
      "sourceUrl": "https://example.org/source.tar.gz",
      "testFiles": Array [
        Object {
          "hash": "hash1",
          "path": "path1",
        },
        Object {
          "hash": "hash2",
          "path": "path2",
        },
      ],
    }
  `);
});
