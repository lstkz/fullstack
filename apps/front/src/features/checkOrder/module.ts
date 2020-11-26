import { getRouteParams } from 'src/common/url';
import * as Rx from 'src/rx';
import { api } from 'src/services/api';
import { ActionLike } from 'typeless';
import { RouterActions } from 'typeless-router';
import { CheckOrderActions, CheckOrderState, handle } from './interface';

// --- Epic ---
handle.epic().on(CheckOrderActions.$mounted, ({}, { action$ }) => {
  const { orderId } = getRouteParams('check-order');
  const check: () => Rx.Observable<ActionLike> = () =>
    api.order_checkOrderStatus(orderId).pipe(
      Rx.mergeMap(ret => {
        if (ret.status === 'PAID') {
          return Rx.of(CheckOrderActions.done());
        }
        return Rx.of(null).pipe(Rx.delay(1000), Rx.mergeMap(check));
      })
    );

  return check().pipe(
    Rx.takeUntil(action$.pipe(Rx.waitForType(RouterActions.locationChange)))
  );
});

// --- Reducer ---
const initialState: CheckOrderState = {
  isDone: true,
};

handle.reducer(initialState).on(CheckOrderActions.done, state => {
  state.isDone = true;
});

// --- Module ---
export function useCheckOrderModule() {
  handle();
}
