import { GlobalActions } from '../global/interface';
import { CoursesActions, CoursesState, handle } from './interface';

// --- Epic ---
handle
  .epic()
  .on(GlobalActions.auth, () => CoursesActions.load())
  .on(CoursesActions.$mounted, () => CoursesActions.load());

// --- Reducer ---
const initialState: CoursesState = {
  isLoaded: false,
  items: [],
};

handle
  .reducer(initialState)
  .on(CoursesActions.$init, state => {
    Object.assign(state, initialState);
  })
  .on(CoursesActions.loaded, (state, { result }) => {
    state.isLoaded = false;
    state.items = result;
  });

// --- Module ---
export function useCoursesModule() {
  handle();
}
