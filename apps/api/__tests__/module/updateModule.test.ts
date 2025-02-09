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
        packageJson: '{}',
        isPending: false,
        estimatedPracticeTimeHours: 10,
        lessons: [
          {
            id: 1,
            name: 'l1',
            duration: '1:00',
            sources: [
              {
                type: '720',
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
            videoSolution: null,
            hintHtmlS3Key: null,
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
        "estimatedPracticeTimeHours": 10,
        "isPending": false,
        "lessons": Array [
          Object {
            "duration": "1:00",
            "id": 1,
            "name": "l1",
            "sources": Array [
              Object {
                "type": "720",
                "url": "aaa",
              },
            ],
          },
        ],
        "name": "module 1",
        "packageJson": "{}",
        "tasks": Array [
          Object {
            "detailsS3Key": "details key",
            "hintHtmlS3Key": null,
            "htmlS3Key": "html key",
            "id": 1,
            "isExample": false,
            "name": "t1",
            "sourceS3Key": "source key",
            "testsInfo": Object {
              "files": Array [],
              "resultHash": "hash",
            },
            "videoSolution": null,
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
        packageJson: '{"name": "foo"}',
        isPending: false,
        estimatedPracticeTimeHours: 20,
        lessons: [
          {
            id: 1,
            name: 'l1',
            duration: '1:00',
            sources: [
              {
                type: '720',
                url: 'aaa',
              },
            ],
          },
          {
            id: 2,
            name: 'l2',
            duration: '1:00',
            sources: [
              {
                type: '720',
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
            hintHtmlS3Key: 'hint',
            isExample: false,
            testsInfo: {
              files: [],
              resultHash: 'hash',
            },
            videoSolution: [
              {
                type: '720',
                url: 'aqw',
              },
            ],
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
        "estimatedPracticeTimeHours": 20,
        "isPending": false,
        "lessons": Array [
          Object {
            "duration": "1:00",
            "id": 1,
            "name": "l1",
            "sources": Array [
              Object {
                "type": "720",
                "url": "aaa",
              },
            ],
          },
          Object {
            "duration": "1:00",
            "id": 2,
            "name": "l2",
            "sources": Array [
              Object {
                "type": "720",
                "url": "bbb",
              },
            ],
          },
        ],
        "name": "module 2",
        "packageJson": "{\\"name\\": \\"foo\\"}",
        "tasks": Array [
          Object {
            "detailsS3Key": "details key",
            "hintHtmlS3Key": "hint",
            "htmlS3Key": "html key",
            "id": 2,
            "isExample": false,
            "name": "t2",
            "sourceS3Key": "source key",
            "testsInfo": Object {
              "files": Array [],
              "resultHash": "hash",
            },
            "videoSolution": Array [
              Object {
                "type": "720",
                "url": "aqw",
              },
            ],
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
          packageJson: '',
          description: 'desc 1',
          isPending: false,
          estimatedPracticeTimeHours: 1,
          lessons: [],
          tasks: [],
        },
      },
      'user1_token'
    )
  ).rejects.toThrowError('Admin only');
});
