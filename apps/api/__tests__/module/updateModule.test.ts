import { config } from 'config';
import { ModuleCollection } from '../../src/collections/Module';
import { updateModule } from '../../src/contracts/module/updateModule';
import { execContract, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
});

it('should insert and update a module', async () => {
  await execContract(
    updateModule,
    {
      values: {
        id: 'm1',
        name: 'module 1',
        description: 'desc 1',
        isPending: false,
        lessons: [
          {
            id: 1,
            name: 'l1',
            sources: [
              {
                resolution: '720',
                url: 'aaa',
              },
            ],
          },
        ],
        tasks: [
          {
            id: 1,
            name: 't1',
            detailsS3Key: 'details key',
            sourceS3Key: 'source key',
            htmlS3Key: 'html key',
            isExample: false,
            testsInfo: {
              files: [],
              resultHash: 'hash',
            },
          },
        ],
      },
    },
    config.adminToken
  );
  expect(await ModuleCollection.findAll({})).toMatchInlineSnapshot(`
    Array [
      Object {
        "_id": "m1",
        "description": "desc 1",
        "isPending": false,
        "lessons": Array [
          Object {
            "id": 1,
            "name": "l1",
            "sources": Array [
              Object {
                "resolution": "720",
                "url": "aaa",
              },
            ],
          },
        ],
        "name": "module 1",
        "tasks": Array [
          Object {
            "detailsS3Key": "details key",
            "htmlS3Key": "html key",
            "id": 1,
            "isExample": false,
            "name": "t1",
            "sourceS3Key": "source key",
            "testsInfo": Object {
              "files": Array [],
              "resultHash": "hash",
            },
          },
        ],
      },
    ]
  `);
  await execContract(
    updateModule,
    {
      values: {
        id: 'm1',
        name: 'module 2',
        description: 'desc 2',
        isPending: false,
        lessons: [
          {
            id: 1,
            name: 'l1',
            sources: [
              {
                resolution: '720',
                url: 'aaa',
              },
            ],
          },
          {
            id: 2,
            name: 'l2',
            sources: [
              {
                resolution: '720',
                url: 'bbb',
              },
            ],
          },
        ],
        tasks: [
          {
            id: 2,
            name: 't2',
            detailsS3Key: 'details key',
            sourceS3Key: 'source key',
            htmlS3Key: 'html key',
            isExample: false,
            testsInfo: {
              files: [],
              resultHash: 'hash',
            },
          },
        ],
      },
    },
    config.adminToken
  );
  expect(await ModuleCollection.findAll({})).toMatchInlineSnapshot(`
    Array [
      Object {
        "_id": "m1",
        "description": "desc 2",
        "isPending": false,
        "lessons": Array [
          Object {
            "id": 1,
            "name": "l1",
            "sources": Array [
              Object {
                "resolution": "720",
                "url": "aaa",
              },
            ],
          },
          Object {
            "id": 2,
            "name": "l2",
            "sources": Array [
              Object {
                "resolution": "720",
                "url": "bbb",
              },
            ],
          },
        ],
        "name": "module 2",
        "tasks": Array [
          Object {
            "detailsS3Key": "details key",
            "htmlS3Key": "html key",
            "id": 2,
            "isExample": false,
            "name": "t2",
            "sourceS3Key": "source key",
            "testsInfo": Object {
              "files": Array [],
              "resultHash": "hash",
            },
          },
        ],
      },
    ]
  `);
});

it('should throw if not admin', async () => {
  await expect(
    execContract(
      updateModule,
      {
        values: {
          id: 'm1',
          name: 'module 1',
          description: 'desc 1',
          isPending: false,
          lessons: [],
          tasks: [],
        },
      },
      'user1_token'
    )
  ).rejects.toThrowError('Admin only');
});
