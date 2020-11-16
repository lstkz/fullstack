import { api } from 'src/services/api';
import * as Rx from 'src/rx';
import { GlobalActions } from '../global/interface';
import { CoursesActions, CoursesState, handle } from './interface';
import { handleAppError } from 'src/common/helper';

// --- Epic ---
handle
  .epic()
  .on(GlobalActions.auth, () => CoursesActions.load())
  .on(CoursesActions.$mounted, () => CoursesActions.load())
  .on(CoursesActions.load, () => {
    return api.course_getAllCourses().pipe(
      Rx.map(ret => CoursesActions.loaded(ret)),
      handleAppError()
    );
  });

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
    state.isLoaded = true;
    state.items = result;
  });

// --- Module ---
export function useCoursesModule() {
  handle();
}
