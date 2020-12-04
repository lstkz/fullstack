import { TPayGroup } from 'shared';
import { getTPayGroups as _getTPayGroups } from '../../common/tpay';
import { createContract, createRpcBinding } from '../../lib';

export const getTPayGroups = createContract('order.getTPayGroups')
  .params()
  .returns<TPayGroup[]>()
  .fn(async () => {
    return _getTPayGroups();
  });

export const getTPayGroupsRpc = createRpcBinding({
  public: true,
  signature: 'order.getTPayGroups',
  handler: getTPayGroups,
});
