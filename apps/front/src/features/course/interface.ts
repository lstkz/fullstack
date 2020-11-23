import { RouteConfig } from 'src/types';
import { createModule } from 'typeless';
import { CourseSymbol } from './symbol';

// --- Actions ---
export const [handle, CourseActions, getCourseState] = createModule(
  CourseSymbol
)
  .withActions({})
  .withState<CourseState>();

// --- Routing ---

export const routeConfig: RouteConfig = {
  type: 'route',
  auth: 'any',
  path: '/course',
  component: () => import('./components/CourseView2').then(x => x.CourseView),
};

// --- Types ---
export interface CourseState {
  foo: string;
}
