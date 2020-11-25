import { TPayGroup } from 'shared';
import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { CheckoutSymbol } from './symbol';

// --- Actions ---
export const [handle, CheckoutActions, getCheckoutState] = createModule(
  CheckoutSymbol
)
  .withActions({
    $mounted: null,
    $init: null,
    setCount: (count: number) => ({ payload: { count } }),
    groupsLoaded: (tpayGroups: TPayGroup[]) => ({
      payload: { tpayGroups },
    }),
    setIsSubmitting: (isSubmitting: boolean) => ({ payload: { isSubmitting } }),
    setIsDone: (isDone: boolean) => ({ payload: { isDone } }),
  })
  .withState<CheckoutState>();

// --- Routing ---

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: 'any',
  path: '/checkout',
  component: () =>
    import('./components/CheckoutView').then(x => x.CheckoutView),
};

// --- Types ---
export interface CheckoutState {
  isDone: boolean;
  isSubmitting: boolean;
  count: number;
  tpayGroups: TPayGroup[] | null;
}
