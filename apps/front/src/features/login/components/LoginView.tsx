import React from 'react';
import { LoginFormProvider, LoginFormActions } from '../login-form';
import { createUrl } from '../../../common/url';
import { useActions } from 'typeless';
import { getLoginState } from '../interface';
import { Alert } from 'src/components/Alert';
import { SocialFormButtons } from 'src/components/SocialFormButtons';
import { useLoginModule } from '../module';
import { FullPageForm } from 'src/components/FullPageForm';
import { FormInput } from 'src/new-components/FormInput';
import { Button } from 'src/new-components/Button';
import { Link } from 'src/components/Link';
import styled from 'styled-components';

const ForgotWrapper = styled.div`
  text-align: right;
  font-size: 0.8rem;
  margin-top: 1rem;
`;

export function LoginView() {
  useLoginModule();
  const { submit } = useActions(LoginFormActions);
  const { isSubmitting, error } = getLoginState.useState();

  return (
    <FullPageForm testId="login-form" title="Logowanie">
      <LoginFormProvider>
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          {error && (
            <Alert testId="login-error" type="error">
              {error}
            </Alert>
          )}
          <FormInput
            testId="login-input"
            id="email"
            name="email"
            label="Email"
            placeholder="name@example.com"
          />
          <FormInput
            testId="password-input"
            id="password"
            name="password"
            label="Password"
            placeholder="********"
            type="password"
          />
          <Button
            testId="login-submit"
            type="primary"
            block
            loading={isSubmitting}
            htmlType="submit"
          >
            Zaloguj się
          </Button>
          <SocialFormButtons />
          <ForgotWrapper>
            <Link
              testId="reset-password-link"
              href={createUrl({ name: 'reset-password' })}
            >
              Resetuj hasło
            </Link>
          </ForgotWrapper>
        </form>
      </LoginFormProvider>
    </FullPageForm>
  );
}
