import { AC } from 'typeless';

export * from 'shared/src/types';

export interface RouteConfig<TParams = any, TQuery = any> {
  name?: string;
  type: 'route';
  path: string | string[];
  exact?: boolean;
  auth: boolean | 'any';
  component: () => Promise<() => JSX.Element>;
  noLoader?: boolean;
  waitForAction?: AC;
}
