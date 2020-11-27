import React from 'react';
import { Link } from '../../../components/Link';
import { RegisterFormProvider, RegisterFormActions } from '../register-form';
import { useActions } from 'typeless';
import { FullPageForm } from '../../../components/FullPageForm';
import { SocialFormButtons } from '../../../components/SocialFormButtons';
import { createUrl } from '../../../common/url';
import { getRegisterState } from '../interface';
import { Alert } from 'src/components/Alert';
import { Button } from 'src/new-components/Button';
import { FormInput } from 'src/new-components/FormInput';
import { useRegisterModule } from '../module';

export function RegisterView() {
  useRegisterModule();
  const { submit } = useActions(RegisterFormActions);
  const { isSubmitting, error } = getRegisterState.useState();

  return (
    <FullPageForm
      testId="register-form"
      title="Zarejestruj nowe konto"
      bottom={
        <>
          Masz już konto?{' '}
          <Link testId="login-link" href={createUrl({ name: 'login' })}>
            Zaloguj się
          </Link>
        </>
      }
    >
      <RegisterFormProvider>
        <form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          {error && (
            <Alert testId="register-error" type="error">
              {error}
            </Alert>
          )}
          <FormInput
            testId="email-input"
            id="email"
            name="email"
            label="Adres e-mail"
            placeholder="imie@example.com"
          />

          <FormInput
            testId="password-input"
            id="password"
            name="password"
            label="Hasło"
            placeholder="********"
            type="password"
          />
          <FormInput
            testId="confirm-password-input"
            id="confirmPassword"
            name="confirmPassword"
            label="Powtórz hasło"
            placeholder="********"
            type="password"
          />
          <Button
            testId="register-submit"
            type="primary"
            block
            loading={isSubmitting}
            htmlType="submit"
          >
            Załóż konto
          </Button>
          <SocialFormButtons />
        </form>
      </RegisterFormProvider>
    </FullPageForm>
  );
}
