import { Course, RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { CoursesSymbol } from './symbol';

// --- Actions ---
export const [handle, CoursesActions, getCoursesState] = createModule(
  CoursesSymbol
)
  .withActions({
    $init: null,
    $mounted: null,
    $unmounted: null,
    load: null,
    loaded: (result: Course[]) => ({ payload: { result } }),
  })
  .withState<CoursesState>();

// --- Routing ---

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: 'any',
  path: '/courses',
  component: () => import('./components/CoursesView').then(x => x.CoursesView),
  waitForAction: CoursesActions.loaded,
};

// --- Types ---
export interface CoursesState {
  isLoaded: boolean;
  items: Course[];
}
