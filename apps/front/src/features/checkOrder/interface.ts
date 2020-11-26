import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { CheckOrderSymbol } from './symbol';

// --- Actions ---
export const [handle, CheckOrderActions, getCheckOrderState] = createModule(
  CheckOrderSymbol
)
  .withActions({
    $mounted: null,
  })
  .withState<CheckOrderState>();

// --- Routing ---

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: 'any',
  path: '/check-order/:id',
  component: () =>
    import('./components/CheckOrderView').then(x => x.CheckOrderView),
};

// --- Types ---
export interface CheckOrderState {
  foo: string;
}
