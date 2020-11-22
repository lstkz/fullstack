import { createModule } from 'typeless';
import { SubscriptionSymbol } from './symbol';

// --- Actions ---
export const [handle, SubscriptionActions, getSubscriptionState] = createModule(
  SubscriptionSymbol
)
  .withActions({
    showModal: (visibleModal: SubscriptionModal) => ({
      payload: {
        visibleModal,
      },
    }),
    hideModal: null,
    setIsSubmitting: (isSubmitting: boolean) => ({
      payload: {
        isSubmitting,
      },
    }),
    $mounted: null,
  })
  .withState<SubscriptionState>();

export type SubscriptionModal =
  | 'confirm'
  | 'confirmed'
  | 'already-subscribed'
  | 'unsubscribed';

// --- Types ---
export interface SubscriptionState {
  visibleModal: null | SubscriptionModal;
  isSubmitting: boolean;
}
