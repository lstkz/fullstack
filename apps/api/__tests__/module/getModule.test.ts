import { ModuleCollection } from '../../src/collections/Module';
import { getModule } from '../../src/contracts/module/getModule';
import { execContract, setupDb } from '../helper';
import { getModuleData, registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await ModuleCollection.insertMany([
    {
      ...getModuleData(1),
      lessons: [
        {
          id: 1,
          name: 'l1',
          duration: '1:00',
          sources: [
            {
              resolution: '720',
              url: '720.mp4',
            },
          ],
        },
        {
          id: 2,
          name: 'l2',
          duration: '1:00',
          sources: [
            {
              resolution: '720',
              url: '720.mp4',
            },
            {
              resolution: '1080',
              url: '1080.mp4',
            },
          ],
        },
      ],
    },
    getModuleData(2, true),
  ]);
});

it('should get a module as anonymous', async () => {
  const ret = await execContract(getModule, {
    id: 'm1',
  });
  expect(ret).toMatchInlineSnapshot(`
    Object {
      "description": "desc 1",
      "id": "m1",
      "lessons": Array [
        Object {
          "duration": "1:00",
          "id": 1,
          "isWatched": false,
          "name": "l1",
          "sources": Array [],
        },
        Object {
          "duration": "1:00",
          "id": 2,
          "isWatched": false,
          "name": "l2",
          "sources": Array [],
        },
      ],
      "name": "module 1",
      "tasks": Array [],
    }
  `);
});

it('should get a module as logged in', async () => {
  const ret = await execContract(
    getModule,
    {
      id: 'm1',
    },
    'user1_token'
  );
  expect(ret).toMatchInlineSnapshot(`
    Object {
      "description": "desc 1",
      "id": "m1",
      "lessons": Array [
        Object {
          "duration": "1:00",
          "id": 1,
          "isWatched": false,
          "name": "l1",
          "sources": Array [
            Object {
              "resolution": "720",
              "url": "720.mp4",
            },
          ],
        },
        Object {
          "duration": "1:00",
          "id": 2,
          "isWatched": false,
          "name": "l2",
          "sources": Array [
            Object {
              "resolution": "720",
              "url": "720.mp4",
            },
            Object {
              "resolution": "1080",
              "url": "1080.mp4",
            },
          ],
        },
      ],
      "name": "module 1",
      "tasks": Array [],
    }
  `);
});

it('should throw if not found', async () => {
  await expect(
    execContract(getModule, {
      id: 'm1234',
    })
  ).rejects.toThrow('Module not found: m1234');
});

it('should throw if pending', async () => {
  await expect(
    execContract(getModule, {
      id: 'm2',
    })
  ).rejects.toThrow('Module is pending');
});
