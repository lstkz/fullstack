import { CourseState, handle } from './interface';

// --- Epic ---
handle.epic();

// --- Reducer ---
const initialState: CourseState = {
  foo: 'bar',
};

handle.reducer(initialState);

// --- Module ---
export function useCourseModule() {
  handle();
}
