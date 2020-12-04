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
import { getErrorMessage } from 'src/common/helper';
import { AuthData } from 'shared';

// --- Epic ---

function authWith(fn: () => Rx.Observable<AuthData>) {
  return Rx.concatObs(
    Rx.of(RegisterActions.setSubmitting(true)),
    Rx.of(RegisterActions.setError(null)),
    fn().pipe(
      Rx.map(authData => GlobalActions.auth(authData)),
      Rx.catchError(e => {
        return Rx.of(RegisterActions.setError(getErrorMessage(e)));
      })
    ),
    Rx.of(RegisterActions.setSubmitting(false))
  );
}

handle
  .epic()
  .on(RegisterActions.$mounted, () => RegisterFormActions.reset())
  .on(RegisterFormActions.setSubmitSucceeded, ({}) => {
    const values = R.omit(getRegisterFormState().values, ['confirmPassword']);
    return authWith(() =>
      api.user_register({
        ...values,
      })
    );
  })
  .on(GlobalActions.githubCallback, ({ code }) => {
    return authWith(() => api.user_githubRegister(code));
  })
  .on(GlobalActions.googleCallback, ({ token }) => {
    return authWith(() => api.user_googleRegister(token));
  });

// --- Reducer ---
const initialState: RegisterState = {
  isSubmitting: false,
  error: null,
};

handle
  .reducer(initialState)
  .on(RegisterActions.$init, state => {
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
