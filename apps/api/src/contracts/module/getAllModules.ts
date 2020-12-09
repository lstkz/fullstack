import { Module } from 'shared';
import { ModuleCollection } from '../../collections/Module';
import { mapModule } from '../../common/mapper';
import { createContract, createRpcBinding } from '../../lib';

export const getAllModules = createContract('module.getAllModules')
  .params()
  .returns<Module[]>()
  .fn(async () => {
    const modules = await ModuleCollection.findAll(
      {},
      {
        projection: {
          lessons: -1,
          tasks: -1,
          name: 1,
          description: 1,
        },
      }
    );
    return modules.map(mapModule);
  });

export const getAllModulesRpc = createRpcBinding({
  public: true,
  signature: 'module.getAllModules',
  handler: getAllModules,
});
