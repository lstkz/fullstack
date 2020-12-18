import { S } from 'schema';
import { createContract, createRpcBinding } from '../../lib';

export const submitSolution = createContract('module.submitSolution')
  .params('user', 'values')
  .schema({
    user: S.object().appUser(),
    values: S.object().keys({}),
  })
  .fn(async (user, values) => {});

export const submitSolutionRpc = createRpcBinding({
  injectUser: true,
  signature: 'module.submitSolution',
  handler: submitSolution,
});
