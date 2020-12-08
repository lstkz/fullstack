import React from 'react';
import { Alert } from 'src/components/Alert';
import { SocialFormButtons } from 'src/components/SocialFormButtons';
import { FullPageForm } from 'src/components/FullPageForm';
import { FormInput } from 'src/components/FormInput';
import { Button } from 'src/components/Button';
import styled from 'styled-components';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from 'shared';
import { api } from 'src/services/api';
import { getErrorMessage } from 'src/common/helper';
import { useRouter } from 'next/dist/client/router';
import { useAuthActions } from '../AuthModule';
import { setAccessToken } from 'src/services/Storage';

const ForgotWrapper = styled.div`
  text-align: right;
  font-size: 0.8rem;
  margin-top: 1rem;
`;

interface FormValues {
  email: string;
  password: string;
}

export function LoginView() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { errors, register, handleSubmit } = useForm<FormValues>();
  const [error, setError] = React.useState('');
  const authActions = useAuthActions();
  const router = useRouter();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    setError('');
    try {
      const ret = await api.user_login(data);
      setAccessToken(ret.token);
      authActions.setUser(ret.user);
      await router.push('/modules');
    } catch (e) {
      setError(getErrorMessage(e));
    }
    setIsSubmitting(false);
  };

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
            data-test="reset-password-link"
            href={createUrl({ name: 'reset-password' })}
          >
            Resetuj hasło
          </Link>
        </ForgotWrapper>
      </form>
    </FullPageForm>
  );
}
