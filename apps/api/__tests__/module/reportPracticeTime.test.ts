import { TaskPracticeTimeCollection } from '../../src/collections/TaskPracticeTime';
import { reportPracticeTime } from '../../src/contracts/module/reportPracticeTime';
import { execContract, setupDb } from '../helper';
import {
  addSubscription,
  createModules,
  registerSampleUsers,
} from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers(true);
  await addSubscription(1);
  await createModules();
});

async function _report() {
  return execContract(
    reportPracticeTime,
    {
      moduleId: 'm1',
      taskId: 1,
    },
    'user1_token'
  );
}

it('should report a time', async () => {
  Date.now = () => 1000;

  await _report();
  let item = await TaskPracticeTimeCollection.findOne({});

  // after 10ms
  Date.now = () => 1010;
  await _report();
  item = await TaskPracticeTimeCollection.findOne({});
  expect(item?.totalTimeMinutes).toEqual(1);

  // after 1min
  Date.now = () => 601010;
  await _report();
  item = await TaskPracticeTimeCollection.findOne({});
  expect(item?.totalTimeMinutes).toEqual(2);

  // repeat
  await _report();
  item = await TaskPracticeTimeCollection.findOne({});
  expect(item?.totalTimeMinutes).toEqual(2);
});
