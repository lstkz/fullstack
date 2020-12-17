import { mocked } from 'ts-jest/utils';
import { dispatchTask } from '../src/dispatch';
import { setupDb } from './helper';
import { FlagCollection } from '../src/collections/Flag';
import { runEvery, stopSchedular } from '../src/schedular';

setupDb();

jest.mock('../src/dispatch');

const mockedDispatchTask = mocked(dispatchTask);

const TASK_MS = 10000;

const TASK = {
  type: 'CheckIdleVms',
  payload: {},
} as const;

let spy: jest.MockInstance<Promise<any>, any>;

jest.useFakeTimers();

beforeEach(() => {
  spy = jest.spyOn(FlagCollection, 'findOneAndUpdate');
});

afterEach(() => {
  stopSchedular();
  mockedDispatchTask.mockClear();
  spy.mockRestore();
});

async function waitForCall(
  spy: jest.MockInstance<Promise<any>, any>,
  count: number
) {
  return new Promise<void>((resolve, reject) => {
    const check = async (retry = 0) => {
      if (spy.mock.results.length === count) {
        await Promise.all(
          spy.mock.results.slice(0, count).map(x => x.value?.catch(() => null))
        );
        return resolve();
      }
      if (retry > 200) {
        return reject(new Error('waitForCall timeout'));
      }
      setTimeout(check, 10);
    };
    void check().catch(reject);
  });
}

it('should run a task', async () => {
  runEvery(TASK, TASK_MS);
  await waitForCall(spy, 1);
  expect(mockedDispatchTask).toBeCalledWith(TASK);
});

it('should run a single task 3 times', async () => {
  Date.now = () => 1;
  runEvery(TASK, TASK_MS);
  await waitForCall(spy, 1);

  Date.now = () => 1 + TASK_MS;
  jest.runTimersToTime(TASK_MS);
  await waitForCall(spy, 2);

  Date.now = () => 1 + TASK_MS * 2;
  jest.runTimersToTime(TASK_MS);
  await waitForCall(spy, 3);

  expect(mockedDispatchTask).toBeCalledTimes(3);
});

it('should run a single task (parallel execution)', async () => {
  runEvery(TASK, TASK_MS);
  runEvery(TASK, TASK_MS);
  runEvery(TASK, TASK_MS);
  await waitForCall(spy, 3);
  expect(mockedDispatchTask).toBeCalledTimes(1);
});
