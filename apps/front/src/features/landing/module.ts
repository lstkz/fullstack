import { handle, LandingActions, LandingState } from './interface';

handle.epic();

// --- Reducer ---
const initialState: LandingState = {};

handle.reducer(initialState).on(LandingActions.$init, () => initialState);

export function useLandingModule() {
  handle();
}
