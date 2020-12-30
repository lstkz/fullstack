import React from 'react';
import { Alert } from 'src/components/Alert';
import { SocialFormButtons } from 'src/components/SocialFormButtons';
import { FullPageForm } from 'src/components/FullPageForm';
import { FormInput } from 'src/components/FormInput';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from 'shared';
import { api } from 'src/services/api';
import { useAuthForm } from 'src/hooks/useAuthForm';
import { ButtonNext } from 'src/components/ButtonNext';

interface FormValues {
  email: string;
  password: string;
}

export function LoginPage() {
  const { errors, register, handleSubmit, getValues } = useForm<FormValues>();
  const { error, isSubmitting, onSubmit } = useAuthForm({
    submit: () => api.user_login(getValues()),
  });

  return (
    <FullPageForm
      testId="login-form"
      title="Logowanie"
      bottom={
        <>
          Nie masz już konta?{' '}
          <Link
            data-test="register-link"
            href={createUrl({ name: 'register' })}
          >
            Zarejestruj się
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit(onSubmit)}>
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
          autoComplete="current-password"
          ref={register({
            required: {
              value: true,
              message: 'Podaj hasło',
            },
          })}
          error={errors.password?.message}
        />
        <ButtonNext
          testId="login-submit"
          type="primary"
          block
          loading={isSubmitting}
          htmlType="submit"
        >
          Zaloguj się
        </ButtonNext>
        <SocialFormButtons source="login" />
        <div className="text-right mt-4 text-sm">
          <Link
            data-test="reset-password-link"
            href={createUrl({ name: 'forgot-password' })}
          >
            Resetuj hasło
          </Link>
        </div>
      </form>
    </FullPageForm>
  );
}
