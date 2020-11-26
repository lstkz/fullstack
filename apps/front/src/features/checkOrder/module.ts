import * as Rx from 'src/rx';
import { CheckOrderActions, CheckOrderState, handle } from './interface';

// --- Epic ---
handle.epic().on(CheckOrderActions.$mounted, () => {
  return Rx.EMPTY;
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
