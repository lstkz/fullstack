import { api } from 'src/services/api';
import * as Rx from 'src/rx';
import {
  SubscriptionActions,
  CheckoutState,
  handle,
  getSubscriptionState,
} from './interface';
import { handleAppError } from 'src/common/helper';
import {
  getSubscriptionFormState,
  SubscriptionFormActions,
} from './subscription-form';

// --- Epic ---
handle
  .epic()
  .on(SubscriptionActions.$mounted, () => {
    return Rx.mergeObs(
      api
        .subscriptionPlan_getAllSubscriptionPlans()
        .pipe(Rx.map(ret => SubscriptionActions.subscriptionPlansLoaded(ret))),
      api
        .subscription_getTPayGroups()
        .pipe(Rx.map(ret => SubscriptionActions.groupsLoaded(ret)))
    ).pipe(handleAppError());
  })
  .on(SubscriptionFormActions.setSubmitSucceeded, () => {
    const {
      values: { groupId, ...customer },
    } = getSubscriptionFormState();
    const { planType } = getSubscriptionState();
    return Rx.concatObs(
      Rx.of(SubscriptionActions.setIsSubmitting(true)),
      api
        .subscription_purchase({
          subscriptionPlanId: planType,
          tpayGroup: groupId,
          customer,
        })
        .pipe(
          Rx.map(ret => {
            setTimeout(() => {
              window.location.href = ret.paymentUrl;
            }, 0);
            return SubscriptionActions.setIsDone(true);
          }),
          handleAppError()
        ),
      Rx.of(SubscriptionActions.setIsSubmitting(false))
    );
  })
  .on(SubscriptionFormActions.setSubmitFailed, () => {
    const { errors } = getSubscriptionFormState();

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
  tpayGroups: null,
  subscriptionPlans: [],
  isSubmitting: false,
  isDone: false,
  planType: 'annual',
};

handle
  .reducer(initialState)
  .on(SubscriptionActions.$init, state => {
    Object.assign(state, initialState);
  })
  .on(SubscriptionActions.groupsLoaded, (state, { tpayGroups }) => {
    state.tpayGroups = tpayGroups;
  })
  .on(
    SubscriptionActions.subscriptionPlansLoaded,
    (state, { subscriptionPlans }) => {
      state.subscriptionPlans = subscriptionPlans;
    }
  )
  .on(SubscriptionActions.setIsSubmitting, (state, { isSubmitting }) => {
    state.isSubmitting = isSubmitting;
  })
  .on(SubscriptionActions.setIsDone, (state, { isDone }) => {
    state.isDone = isDone;
  })
  .on(SubscriptionActions.changePlanType, (state, { planType }) => {
    state.planType = planType;
  });

// --- Module ---
export function useCheckoutModule() {
  handle();
}
