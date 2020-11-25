import { api } from 'src/services/api';
import * as Rx from 'src/rx';
import { CheckoutActions, CheckoutState, handle } from './interface';
import { handleAppError } from 'src/common/helper';
import { CheckoutFormActions, getCheckoutFormState } from './checkout-form';

// --- Epic ---
handle
  .epic()
  .on(CheckoutActions.$mounted, () => {
    return api.order_getTPayGroups().pipe(
      Rx.map(ret => CheckoutActions.groupsLoaded(ret)),
      handleAppError()
    );
  })
  .on(CheckoutFormActions.setSubmitSucceeded, () => {
    return Rx.EMPTY;
  })
  .on(CheckoutFormActions.setSubmitFailed, () => {
    const { errors } = getCheckoutFormState();

    const travelChildren = (node: HTMLElement): boolean => {
      return [...node.children].some(x => {
        return travel(x as HTMLElement);
      });
    };
    const travel = (node: HTMLElement) => {
      if (node.style?.display === 'none') {
        return false;
      }
      const id = node.getAttribute('id');
      if (id && (errors as Record<string, string>)[id]) {
        node.scrollIntoView();
        node?.focus();
        return true;
      }
      return travelChildren(node);
    };
    travelChildren(document.body);

    return Rx.EMPTY;
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
