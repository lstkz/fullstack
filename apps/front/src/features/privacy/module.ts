import { PrivacyActions, PrivacyState, handle } from './interface';

// --- Epic ---
handle.epic();

// --- Reducer ---
const initialState: PrivacyState = {
  foo: 'bar',
};

handle.reducer(initialState);

// --- Module ---
export function usePrivacyModule() {
  handle();
};
