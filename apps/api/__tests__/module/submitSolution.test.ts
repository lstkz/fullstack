import { mocked } from 'ts-jest/utils';
import { ModuleCollection } from '../../src/collections/Module';
import { TaskSolutionCollection } from '../../src/collections/TaskSolution';
import { checkS3KeyExists } from '../../src/common/aws-helper';
import { submitSolution } from '../../src/contracts/module/submitSolution';
import { execContract, getId, setupDb } from '../helper';
import { addSubscription, registerSampleUsers } from '../seed-data';

jest.mock('../../src/common/aws-helper');
const mocked_checkS3KeyExists = mocked(checkS3KeyExists);

setupDb();

function getDefaultParams() {
  return {
    moduleId: 'm1',
    taskId: 1,
    resultHash: 'hash123',
    uploadKey: `solutions/${getId(1)}/kdjkam.tar.gz`,
  };
}

let params = getDefaultParams();

beforeEach(async () => {
  params = getDefaultParams();
  await registerSampleUsers();
  await addSubscription(1);
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
          htmlS3Key: '1.html',
          hintHtmlS3Key: null,
          videoSolution: null,
          testsInfo: {
            files: [],
            resultHash: 'hash123',
          },
        },
      ],
    },
  ]);
  mocked_checkS3KeyExists.mockImplementation(async () => true);
});

it('should throw if not pro', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: params,
      },
      'user2_token'
    )
  ).rejects.toThrow('Subscription required');
});

it('should throw if not invalid hash', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          resultHash: 'aaaaa',
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid resultHash');
});

it('should throw if not invalid upload key', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          uploadKey: 'aaaaa',
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid uploadKey');
});

it('should throw if not invalid upload key (wrong user)', async () => {
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          uploadKey: `solutions/${getId(2)}/kdjkam.tar.gz`,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid uploadKey');
});

it('should throw if source not uploaded', async () => {
  mocked_checkS3KeyExists.mockImplementation(async () => false);
  await expect(
    execContract(
      submitSolution,
      {
        values: {
          ...params,
          uploadKey: `solutions/${getId(2)}/kdjkam.tar.gz`,
        },
      },
      'user1_token'
    )
  ).rejects.toThrow('Invalid uploadKey');
});

it('should insert solution successfully', async () => {
  await execContract(
    submitSolution,
    {
      values: params,
    },
    'user1_token'
  );
  const existing = await TaskSolutionCollection.findOne({});
  expect(existing?.userId.toHexString()).toEqual(getId(1).toHexString());
});

it('should should throw if upload key is duplicated', async () => {
  await execContract(
    submitSolution,
    {
      values: params,
    },
    'user1_token'
  );
  await expect(
    execContract(
      submitSolution,
      {
        values: params,
      },
      'user1_token'
    )
  ).rejects.toThrow('UploadKey already used');
});
