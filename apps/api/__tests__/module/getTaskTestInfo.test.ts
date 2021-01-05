import { config } from 'config';
import { ModuleCollection } from '../../src/collections/Module';
import { getTaskTestInfo } from '../../src/contracts/module/getTaskTestInfo';
import { execContract, setupDb } from '../helper';
import {
  addSubscription,
  getModuleData,
  getTaskData,
  registerSampleUsers,
} from '../seed-data';

setupDb();

beforeEach(async () => {
  config.cdnBaseUrl = 'https://example.org';

  await registerSampleUsers();
  await ModuleCollection.insertMany([
    {
      ...getModuleData(1),
      tasks: [getTaskData(1)],
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
      "sourceUrl": "https://example.org/sourceS3Key_1.js",
      "testFiles": Array [
        Object {
          "hash": "111",
          "path": "main.ts",
        },
      ],
    }
  `);
});
