import { createModule } from 'typeless';
import { EmailSubscriptionSymbol } from './symbol';

// --- Actions ---
export const [
  handle,
  EmailSubscriptionActions,
  getEmailSubscriptionState,
] = createModule(EmailSubscriptionSymbol)
  .withActions({
    showModal: (visibleModal: EmailSubscriptionModal) => ({
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
  .withState<EmailSubscriptionState>();

export type EmailSubscriptionModal =
  | 'confirm'
  | 'confirmed'
  | 'already-subscribed'
  | 'unsubscribed';

// --- Types ---
export interface EmailSubscriptionState {
  visibleModal: null | EmailSubscriptionModal;
  isSubmitting: boolean;
}
