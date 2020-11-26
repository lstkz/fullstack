import { api } from 'src/services/api';
import { CheckOrderActions, CheckOrderState, handle } from './interface';

// --- Epic ---
handle.epic().on(CheckOrderActions.$mounted, () => {
  api.get;
});

// --- Reducer ---
const initialState: CheckOrderState = {
  foo: 'bar',
};

handle.reducer(initialState);

// --- Module ---
export function useCheckOrderModule() {
  handle();
}
