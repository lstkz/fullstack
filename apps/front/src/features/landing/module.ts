import * as Rx from 'src/rx';
import { api } from 'src/services/api';
import { handle, LandingActions, LandingState } from './interface';
import { getSubscribeFormState, SubscribeFormActions } from './subscribe-form';

handle.epic().on(SubscribeFormActions.setSubmitSucceeded, () => {
  const { email } = getSubscribeFormState().values;
  return Rx.concatObs(
    Rx.of(LandingActions.setIsSubmitting(true)),
    api
      .subscription_subscribe(null, email)
      .pipe(Rx.mergeMap(() => Rx.of(LandingActions.showModal('confirm')))),
    Rx.of(LandingActions.setIsSubmitting(false))
  );
});

// --- Reducer ---
const initialState: LandingState = {
  visibleModal: null,
  isSubmitting: false,
};

handle
  .reducer(initialState)
  .on(LandingActions.$init, () => initialState)
  .on(LandingActions.showModal, (state, { visibleModal }) => {
    state.visibleModal = visibleModal;
  })
  .on(LandingActions.hideModal, state => {
    state.visibleModal = null;
  })
  .on(LandingActions.setIsSubmitting, (state, { isSubmitting }) => {
    state.isSubmitting = isSubmitting;
  });

export function useLandingModule() {
  handle();
}
