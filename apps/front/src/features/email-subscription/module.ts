import { handleAppError } from 'src/common/helper';
import { parseQueryString } from 'src/common/url';
import * as Rx from 'src/rx';
import { api } from 'src/services/api';
import { RouterActions } from 'typeless-router';
import {
  EmailSubscriptionActions,
  EmailSubscriptionState,
  handle,
} from './interface';
import {
  getEmailSubscribeFormState,
  EmailSubscribeFormActions,
} from './emailSubscribe-form';

// --- Epic ---
handle
  .epic()
  .on(EmailSubscriptionActions.$mounted, () => {
    const qs = parseQueryString(location.search);
    if (qs['confirm-email']) {
      const code = qs['confirm-email'];
      return Rx.concatObs(
        Rx.of(
          RouterActions.replace({
            pathname: location.pathname,
          })
        ),
        api.emailSubscription_confirmSubscription(code).pipe(
          Rx.map(() => EmailSubscriptionActions.showModal('confirmed')),
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
        api
          .emailSubscription_unsubscribe(qs.email, qs.unsubscribe, qs.source)
          .pipe(
            Rx.map(() => EmailSubscriptionActions.showModal('unsubscribed')),
            handleAppError()
          )
      );
    }
    return Rx.empty();
  })
  .on(EmailSubscribeFormActions.setSubmitSucceeded, () => {
    const { email } = getEmailSubscribeFormState().values;
    return Rx.concatObs(
      Rx.of(EmailSubscriptionActions.setIsSubmitting(true)),
      api.emailSubscription_subscribe(null, email).pipe(
        Rx.map(ret =>
          EmailSubscriptionActions.showModal(
            ret.result === 'ok' ? 'confirm' : 'already-subscribed'
          )
        ),
        handleAppError()
      ),
      Rx.of(EmailSubscriptionActions.setIsSubmitting(false))
    );
  });

// --- Reducer ---
const initialState: EmailSubscriptionState = {
  visibleModal: null,
  isSubmitting: false,
};

handle
  .reducer(initialState)
  .on(EmailSubscriptionActions.showModal, (state, { visibleModal }) => {
    state.visibleModal = visibleModal;
  })
  .on(EmailSubscriptionActions.hideModal, state => {
    state.visibleModal = null;
  })
  .on(EmailSubscriptionActions.setIsSubmitting, (state, { isSubmitting }) => {
    state.isSubmitting = isSubmitting;
  });

// --- Module ---
export function useSubscriptionModule() {
  handle();
}
