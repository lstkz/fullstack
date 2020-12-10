import { ModuleCollection } from '../../src/collections/Module';
import { getModule } from '../../src/contracts/module/getModule';
import { execContract, setupDb } from '../helper';
import { registerSampleUsers } from '../seed-data';

setupDb();

beforeEach(async () => {
  await registerSampleUsers();
  await ModuleCollection.insertMany([
    {
      _id: 'm1',
      name: 'module 1',
      description: 'desc 1',
      isPending: false,
      lessons: [],
      tasks: [],
    },
    {
      _id: 'm2',
      name: 'module 2',
      description: 'desc 2',
      isPending: true,
      lessons: [],
      tasks: [],
    },
  ]);
});

it('should get a module as anonymous', async () => {
  const ret = await execContract(getModule, {
    id: 'm1',
  });
  expect(ret).toEqual({ id: 'm1', name: 'module 1', description: 'desc 1' });
});

it('should get a module as logged in', async () => {
  const ret = await execContract(
    getModule,
    {
      id: 'm1',
    },
    'user1_token'
  );
  expect(ret).toEqual({ id: 'm1', name: 'module 1', description: 'desc 1' });
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
