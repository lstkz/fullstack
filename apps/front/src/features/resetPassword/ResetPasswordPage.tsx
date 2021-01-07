import React from 'react';
import { Alert } from 'src/components/Alert';
import { FullPageForm } from 'src/components/FullPageForm';
import { FormInput } from 'src/components/FormInput';
import { useForm } from 'react-hook-form';
import { PASSWORD_MIN_LENGTH } from 'shared';
import { api } from 'src/services/api';
import { useAuthForm } from 'src/hooks/useAuthForm';
import { useRouter } from 'next/dist/client/router';
import { Button } from 'src/components/Button';
import { HeadTitle } from 'src/components/HeadTitle';

interface FormValues {
  password: string;
  confirmPassword: string;
}

export function ResetPasswordPage() {
  const router = useRouter();
  const { errors, register, handleSubmit, getValues } = useForm<FormValues>();
  const { error, isSubmitting, onSubmit } = useAuthForm({
    submit: () =>
      api.user_confirmResetPassword(
        router.query.code as string,
        getValues().password
      ),
  });

  return (
    <FullPageForm
      testId="reset-password-form"
      title="Zmień Hasło"
      subTitle={<>Ustaw nowe hasło</>}
    >
      <HeadTitle title="Zmień Hasło" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert testId="reset-password-error" type="error">
            {error}
          </Alert>
        )}
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
        <Button
          testId="change-password-submit"
          type="primary"
          block
          loading={isSubmitting}
          htmlType="submit"
        >
          Zmień Hasło
        </Button>
      </form>
    </FullPageForm>
  );
}
