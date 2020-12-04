// import { api } from 'src/services/api';
// import * as Rx from 'src/rx';
import {
  CheckoutActions,
  CheckoutState,
  // getCheckoutState,
  handle,
} from './interface';
// import { handleAppError } from 'src/common/helper';
// import { CheckoutFormActions, getCheckoutFormState } from './checkout-form';
// import { getRouteParams } from 'src/common/url';

// const courseId = 'ts_algo';

// --- Epic ---
handle.epic();
// .on(CheckoutActions.$mounted, () => {
//   const { courseId } = getRouteParams('checkout');
//   return Rx.mergeObs(
//     api
//       .course_getCourse(courseId)
//       .pipe(Rx.map(ret => CheckoutActions.courseLoaded(ret))),
//     api
//       .order_getTPayGroups()
//       .pipe(Rx.map(ret => CheckoutActions.groupsLoaded(ret)))
//   ).pipe(handleAppError());
// })
// .on(CheckoutFormActions.setSubmitSucceeded, () => {
//   const {
//     values: { groupId, agreeTerms, agreeNewsletter, ...customer },
//   } = getCheckoutFormState();
//   const { count, priceNet } = getCheckoutState();
//   return Rx.concatObs(
//     Rx.of(CheckoutActions.setIsSubmitting(true)),
//     api
//       .order_createOrder({
//         quantity: count,
//         requestUnitPriceNet: priceNet,
//         group: groupId,
//         subscribeNewsletter: agreeNewsletter,
//         product: {
//           type: 'course',
//           courseId,
//         },
//         customer,
//       })
//       .pipe(
//         Rx.map(ret => {
//           setTimeout(() => {
//             window.location.href = ret.paymentUrl;
//           }, 0);
//           return CheckoutActions.setIsDone(true);
//         }),
//         handleAppError()
//       ),
//     Rx.of(CheckoutActions.setIsSubmitting(false))
//   );
// })
// .on(CheckoutFormActions.setSubmitFailed, () => {
//   const { errors } = getCheckoutFormState();

//   const travelChildren = (node: HTMLElement): boolean => {
//     return [...node.children].some(x => {
//       return travel(x as HTMLElement);
//     });
//   };
//   const travel = (node: HTMLElement) => {
//     if (node.style?.display === 'none') {
//       return false;
//     }
//     const id = node.getAttribute('id');
//     if (id && (errors as Record<string, string>)[id]) {
//       node.scrollIntoView();
//       node?.focus();
//       return true;
//     }
//     return travelChildren(node);
//   };
//   travelChildren(document.body);

//   return Rx.EMPTY;
// });

// --- Reducer ---
const initialState: CheckoutState = {
  count: 1,
  tpayGroups: null,
  isSubmitting: false,
  isDone: false,
  course: null,
  priceNet: 0,
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
  })
  .on(CheckoutActions.setIsSubmitting, (state, { isSubmitting }) => {
    state.isSubmitting = isSubmitting;
  })
  .on(CheckoutActions.setIsDone, (state, { isDone }) => {
    state.isDone = isDone;
  })
  .on(CheckoutActions.courseLoaded, (state, { course }) => {
    state.course = course;
    state.priceNet =
      new Date(course.promoEnds).getTime() < Date.now()
        ? course.price
        : course.promoPrice;
  });

// --- Module ---
export function useCheckoutModule() {
  handle();
}
