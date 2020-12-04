import { SubscriptionPlan } from 'shared';
import { SubscriptionPlanCollection } from '../../collections/SubscriptionPlan';
import { renameId } from '../../common/helper';
import { createContract, createRpcBinding } from '../../lib';

export const getAllSubscriptionPlans = createContract(
  'subscriptionPlan.getAllSubscriptionPlans'
)
  .params()
  .returns<SubscriptionPlan[]>()
  .fn(async () => {
    const plans = await SubscriptionPlanCollection.findAll({});
    return plans.map(x => renameId(x));
  });

export const getAllSubscriptionPlansRpc = createRpcBinding({
  public: true,
  signature: 'subscriptionPlan.getAllSubscriptionPlans',
  handler: getAllSubscriptionPlans,
});
