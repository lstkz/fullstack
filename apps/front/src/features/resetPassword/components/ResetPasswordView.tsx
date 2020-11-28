import React from 'react';
import { Link } from '../../../components/Link';
import {
  ResetPasswordFormProvider,
  ResetPasswordFormActions,
} from '../resetPassword-form';
import { FullPageForm } from '../../../components/FullPageForm';
import { createUrl } from '../../../common/url';
import { useActions } from 'typeless';
import { getResetPasswordState } from '../interface';
import { Alert } from 'src/components/Alert';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { useResetPasswordModule } from '../module';
import styled from 'styled-components';
import { Button } from 'src/components/Button';
import { FormInput } from 'src/components/FormInput';

const BottomWrapper = styled.div`
  text-align: right;
  font-size: 0.8rem;
  margin-top: 1rem;
`;

export function ResetPasswordView() {
  useResetPasswordModule();
  const { submit } = useActions(ResetPasswordFormActions);
  const { isSubmitting, error, isDone } = getResetPasswordState.useState();

  if (isDone) {
    return <PasswordResetSuccess />;
  }

  return (
    <FullPageForm small testId="reset-password-form" title="Resetuj Hasło">
      <ResetPasswordFormProvider>
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          {error && (
            <Alert testId="reset-password-error" type="error">
              {error}
            </Alert>
          )}

          <FormInput
            testId="email-input"
            id="email"
            name="email"
            label="Adres e-mail"
            placeholder="name@example.com"
          />
          <Button
            testId="reset-password-submit"
            type="primary"
            block
            loading={isSubmitting}
            htmlType="submit"
          >
            Resetuj Hasło
          </Button>
        </form>
      </ResetPasswordFormProvider>
      <BottomWrapper>
        <Link testId="login-link" href={createUrl({ name: 'login' })}>
          Wróć do logowania
        </Link>
      </BottomWrapper>
    </FullPageForm>
  );
}
