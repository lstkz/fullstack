import { api } from 'src/services/api';
import * as Rx from 'src/rx';
import { CheckoutActions, CheckoutState, handle } from './interface';
import { handleAppError } from 'src/common/helper';

// --- Epic ---
handle.epic().on(CheckoutActions.$mounted, () => {
  return api.order_getTPayGroups().pipe(
    Rx.map(ret => CheckoutActions.groupsLoaded(ret)),
    handleAppError()
  );
  //
});

// --- Reducer ---
const initialState: CheckoutState = {
  count: 1,
  tpayGroups: null,
};

handle
  .reducer(initialState)
  .on(CheckoutActions.$init, state => {
    Object.assign(state, initialState);
  })
  .on(CheckoutActions.setCount, (state, { count }) => {
    state.count = count;
  })
  .on(CheckoutActions.groupsLoaded, (state, { tpayGroups }) => {
    state.tpayGroups = tpayGroups;
  });

// --- Module ---
export function useCheckoutModule() {
  handle();
}
