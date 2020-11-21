import {
  GlobalActions,
  handle,
  LandingActions,
  LandingState,
} from './interface';

import { api } from 'src/services/api';

handle.epic();

// --- Reducer ---
const initialState: LandingState = {
  isShowConfirmModal: false,
  isShowConfirmedModal: false,
};

handle.reducer(initialState).on(LandingActions.$init, () => initialState);

export function useLandingModule() {
  handle();
}
