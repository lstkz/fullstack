import { S } from 'schema';
import { ModuleDetails } from 'shared';
import { ModuleCollection } from '../../collections/Module';
import { AppError } from '../../common/errors';
import { createContract, createRpcBinding } from '../../lib';

export const getModule = createContract('module.getModule')
  .params('user', 'id')
  .schema({
    user: S.object().appUser().optional(),
    id: S.string(),
  })
  .returns<ModuleDetails>()
  .fn(async (user, id) => {
    const module = await ModuleCollection.findById(id);
    if (!module) {
      throw new AppError('Module not found: ' + id);
    }
    if (module.isPending) {
      throw new AppError('Module is pending');
    }
    return {
      id: module._id,
      name: module.name,
      description: module.description,
      lessons: module.lessons.map(item => ({
        id: item.id,
        name: item.name,
      })),
      tasks: module.tasks.map(item => ({
        id: item.id,
        name: item.name,
        isExample: item.isExample,
      })),
    };
  });

export const getModuleRpc = createRpcBinding({
  public: true,
  injectUser: true,
  signature: 'module.getModule',
  handler: getModule,
});
