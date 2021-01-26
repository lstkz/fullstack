import { S } from 'schema';
import * as R from 'remeda';
import { ModuleCollection } from '../../collections/Module';
import { createContract, createRpcBinding } from '../../lib';

const getVideoSourcesSchema = () =>
  S.array().items(
    S.object().keys({
      resolution: S.string(),
      url: S.string(),
    })
  );

export const updateModule = createContract('module.updateModule')
  .params('values')
  .schema({
    values: S.object().keys({
      id: S.string(),
      isPending: S.boolean(),
      name: S.string(),
      description: S.string(),
      estimatedPracticeTimeHours: S.number(),
      packageJson: S.string(),
      lessons: S.array().items(
        S.object().keys({
          id: S.number(),
          name: S.string(),
          duration: S.string(),
          sources: getVideoSourcesSchema(),
        })
      ),
      tasks: S.array().items(
        S.object().keys({
          id: S.number(),
          name: S.string(),
          isExample: S.boolean(),
          detailsS3Key: S.string(),
          sourceS3Key: S.string(),
          htmlS3Key: S.string(),
          hintHtmlS3Key: S.string().nullable(),
          testsInfo: S.object().keys({
            resultHash: S.string(),
            files: S.array().items(
              S.object().keys({
                path: S.string(),
                hash: S.string(),
              })
            ),
          }),
          videoSolution: getVideoSourcesSchema().nullable(),
        })
      ),
    }),
  })
  .fn(async values => {
    await ModuleCollection.findOneAndUpdate(
      {
        _id: values.id,
      },
      {
        $set: {
          ...R.omit(values, ['id']),
        },
      },
      {
        upsert: true,
      }
    );
  });

export const updateModuleRpc = createRpcBinding({
  admin: true,
  signature: 'module.updateModule',
  handler: updateModule,
});
