import React from 'react';
import * as R from 'remeda';
import { Alert } from 'src/components/Alert';
import { SocialFormButtons } from 'src/components/SocialFormButtons';
import { FullPageForm } from 'src/components/FullPageForm';
import { FormInput } from 'src/components/FormInput';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX, PASSWORD_MIN_LENGTH } from 'shared';
import { api } from 'src/services/api';
import { useAuthForm } from 'src/hooks/useAuthForm';
import { ButtonNext } from 'src/components/ButtonNext';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

export function RegisterPage() {
  const { errors, register, handleSubmit, getValues } = useForm<FormValues>();
  const { error, isSubmitting, onSubmit } = useAuthForm({
    submit: () => api.user_register(R.omit(getValues(), ['confirmPassword'])),
  });

  return (
    <FullPageForm
      testId="register-form"
      title="Zarejestruj nowe konto"
      bottom={
        <>
          Masz już konto?{' '}
          <Link data-test="login-link" href={createUrl({ name: 'login' })}>
            Zaloguj się
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert testId="register-error" type="error">
            {error}
          </Alert>
        )}
        <FormInput
          testId="register-input"
          id="email"
          name="email"
          label="Email"
          placeholder="name@example.com"
          autoComplete="email"
          ref={register({
            required: {
              value: true,
              message: 'Podaj adres email',
            },
            pattern: {
              value: EMAIL_REGEX,
              message: 'Niepoprawny email',
            },
          })}
          error={errors.email?.message}
        />
        <FormInput
          testId="password-input"
          id="password"
          name="password"
          label="Hasło"
          placeholder="********"
          type="password"
          autoComplete="new-password"
          ref={register({
            required: {
              value: true,
              message: 'Podaj hasło',
            },
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: `Minimum ${PASSWORD_MIN_LENGTH} znaków`,
            },
          })}
          error={errors.password?.message}
        />
        <FormInput
          testId="confirm-password-input"
          id="confirmPassword"
          name="confirmPassword"
          label="Powtórz hasło"
          placeholder="********"
          type="password"
          autoComplete="new-password"
          ref={register({
            required: {
              value: true,
              message: 'Podaj hasło',
            },
            validate: (data: string) => {
              if (data !== getValues().password) {
                return 'Hasła muszą być takie same';
              }
              return true;
            },
          })}
          error={errors.confirmPassword?.message}
        />
        <ButtonNext
          testId="register-submit"
          type="primary"
          block
          loading={isSubmitting}
          htmlType="submit"
        >
          Załóż konto
        </ButtonNext>
        <SocialFormButtons source="register" />
      </form>
    </FullPageForm>
  );
}
