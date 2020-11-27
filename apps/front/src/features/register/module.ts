import * as Rx from 'src/rx';
import * as R from 'remeda';
import { RegisterActions, RegisterState, handle } from './interface';
import {
  RegisterFormActions,
  getRegisterFormState,
  useRegisterForm,
} from './register-form';
import { api } from 'src/services/api';
import { GlobalActions } from '../global/interface';
import { getErrorMessage, handleAuth } from 'src/common/helper';
import { AuthData } from 'shared';
import { parseQueryString } from 'src/common/url';
import { getRouterState, RouterActions } from 'typeless-router';

// --- Epic ---

function authWith(
  action$: Rx.Observable<any>,
  fn: () => Rx.Observable<AuthData>
) {
  return Rx.concatObs(
    Rx.of(RegisterActions.setSubmitting(true)),
    Rx.of(RegisterActions.setError(null)),
    fn().pipe(
      Rx.mergeMap(authData =>
        handleAuth({
          authData,
          reset: RegisterActions.reset,
          action$,
        })
      ),
      Rx.catchError(e => {
        return Rx.of(RegisterActions.setError(getErrorMessage(e)));
      })
    ),
    Rx.of(RegisterActions.setSubmitting(false))
  );
}

function _getActivationCode() {
  const qs = parseQueryString(getRouterState().location?.search);
  return qs.code;
}

handle
  .epic()
  .on(RegisterActions.$mounted, () => {
    if (!_getActivationCode()) {
      return RouterActions.push('/');
    }
    return Rx.EMPTY;
  })
  .on(RegisterActions.reset, () => RegisterFormActions.reset())
  .on(RegisterFormActions.setSubmitSucceeded, ({}, { action$ }) => {
    const activationCode = _getActivationCode();
    const values = R.omit(getRegisterFormState().values, ['confirmPassword']);
    return authWith(action$, () =>
      api.user_register({
        activationCode,
        ...values,
      })
    );
  })
  .on(GlobalActions.githubCallback, ({ code }, { action$ }) => {
    return authWith(action$, () =>
      api.user_githubRegister(code, _getActivationCode())
    );
  })
  .on(GlobalActions.googleCallback, ({ token }, { action$ }) => {
    return authWith(action$, () =>
      api.user_googleRegister(token, _getActivationCode())
    );
  });

// --- Reducer ---
const initialState: RegisterState = {
  isSubmitting: false,
  error: null,
};

handle
  .reducer(initialState)
  .on(RegisterActions.reset, state => {
    Object.assign(state, initialState);
  })
  .on(RegisterActions.setSubmitting, (state, { isSubmitting }) => {
    state.isSubmitting = isSubmitting;
  })
  .on(RegisterActions.setError, (state, { error }) => {
    state.error = error;
  });

// --- Module ---
export function useRegisterModule() {
  useRegisterForm();
  handle();
}
