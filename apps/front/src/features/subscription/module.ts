import { handleAppError } from 'src/common/helper';
import { parseQueryString } from 'src/common/url';
import * as Rx from 'src/rx';
import { api } from 'src/services/api';
import { RouterActions } from 'typeless-router';
import { SubscriptionActions, SubscriptionState, handle } from './interface';
import { getSubscribeFormState, SubscribeFormActions } from './subscribe-form';

// --- Epic ---
handle
  .epic()
  .on(SubscriptionActions.$mounted, () => {
    const qs = parseQueryString(location.search);
    if (qs['confirm-email']) {
      const code = qs['confirm-email'];
      return Rx.concatObs(
        Rx.of(
          RouterActions.replace({
            pathname: location.pathname,
          })
        ),
        api.subscription_confirmSubscription(code).pipe(
          Rx.map(() => SubscriptionActions.showModal('confirmed')),
          handleAppError()
        )
      );
    } else if (qs.unsubscribe && qs.email && qs.source) {
      return Rx.concatObs(
        Rx.of(
          RouterActions.replace({
            pathname: location.pathname,
          })
        ),
        api.subscription_unsubscribe(qs.email, qs.unsubscribe, qs.source).pipe(
          Rx.map(() => SubscriptionActions.showModal('unsubscribed')),
          handleAppError()
        )
      );
    }
    return Rx.empty();
  })
  .on(SubscribeFormActions.setSubmitSucceeded, () => {
    const { email } = getSubscribeFormState().values;
    return Rx.concatObs(
      Rx.of(SubscriptionActions.setIsSubmitting(true)),
      api.subscription_subscribe(null, email).pipe(
        Rx.map(ret =>
          SubscriptionActions.showModal(
            ret.result === 'ok' ? 'confirm' : 'already-subscribed'
          )
        ),
        handleAppError()
      ),
      Rx.of(SubscriptionActions.setIsSubmitting(false))
    );
  });

// --- Reducer ---
const initialState: SubscriptionState = {
  visibleModal: null,
  isSubmitting: false,
};

handle
  .reducer(initialState)
  .on(SubscriptionActions.showModal, (state, { visibleModal }) => {
    state.visibleModal = visibleModal;
  })
  .on(SubscriptionActions.hideModal, state => {
    state.visibleModal = null;
  })
  .on(SubscriptionActions.setIsSubmitting, (state, { isSubmitting }) => {
    state.isSubmitting = isSubmitting;
  });

// --- Module ---
export function useSubscriptionModule() {
  handle();
}
