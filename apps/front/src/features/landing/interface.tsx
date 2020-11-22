import { LandingSymbol } from './symbol';

import { RouteConfig } from '../../types';
import { createModule } from 'typeless';

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: false,
  path: '/',
  component: () =>
    import(/* webpackChunkName: 'landing' */ './components/LandingView').then(
      x => x.LandingView
    ),
  noLoader: true,
};

// --- Actions ---
export const [handle, LandingActions, getLandingState] = createModule(
  LandingSymbol
)
  .withActions({
    $init: null,
    $mounted: null,
  })
  .withState<LandingState>();

// --- Types ---
export interface LandingState {}
