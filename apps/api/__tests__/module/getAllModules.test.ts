import { ModuleCollection } from '../../src/collections/Module';
import { getAllModules } from '../../src/contracts/module/getAllModules';
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

it('should return all modules as anonymous', async () => {
  const ret = await execContract(getAllModules, {});
  expect(ret).toEqual([
    { id: 'm1', name: 'module 1', description: 'desc 1' },
    { id: 'm2', name: 'module 2', description: 'desc 2' },
  ]);
});

it('should return all modules as logged in', async () => {
  const ret = await execContract(getAllModules, {}, 'user1_token');
  expect(ret).toEqual([
    { id: 'm1', name: 'module 1', description: 'desc 1' },
    { id: 'm2', name: 'module 2', description: 'desc 2' },
  ]);
});
