import { SubscriptionPlan, SubscriptionPlanType, TPayGroup } from 'shared';
import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { SubscriptionSymbol } from './symbol';

// --- Actions ---
export const [handle, SubscriptionActions, getSubscriptionState] = createModule(
  SubscriptionSymbol
)
  .withActions({
    $mounted: null,
    $init: null,
    groupsLoaded: (tpayGroups: TPayGroup[]) => ({
      payload: { tpayGroups },
    }),
    setIsSubmitting: (isSubmitting: boolean) => ({ payload: { isSubmitting } }),
    setIsDone: (isDone: boolean) => ({ payload: { isDone } }),
    subscriptionPlansLoaded: (subscriptionPlans: SubscriptionPlan[]) => ({
      payload: { subscriptionPlans },
    }),
    changePlanType: (planType: SubscriptionPlanType) => ({
      payload: { planType },
    }),
  })
  .withState<CheckoutState>();

// --- Routing ---

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: 'any',
  path: '/subscription',
  component: () =>
    import('./components/SubscriptionView').then(x => x.SubscriptionView),
};

// --- Types ---
export interface CheckoutState {
  isDone: boolean;
  planType: SubscriptionPlanType;
  isSubmitting: boolean;
  tpayGroups: TPayGroup[] | null;
  subscriptionPlans: SubscriptionPlan[];
}
