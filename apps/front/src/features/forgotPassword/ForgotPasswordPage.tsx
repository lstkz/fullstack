import React from 'react';
import { Alert } from 'src/components/Alert';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { FormInput } from 'src/components/FormInput';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from 'shared';
import { FullPageForm } from 'src/components/FullPageForm';
import { api } from 'src/services/api';
import { getErrorMessage } from 'src/common/helper';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import { Button } from 'src/components/Button';

interface FormValues {
  email: string;
}

export function ForgotPasswordPage() {
  const { errors, register, handleSubmit } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const [error, setError] = React.useState('');

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    setError('');
    try {
      await api.user_resetPassword(values.email);
      setIsDone(true);
    } catch (e) {
      setError(getErrorMessage(e));
    }
    setIsSubmitting(false);
  };

  if (isDone) {
    return <PasswordResetSuccess />;
  }

  return (
    <FullPageForm testId="reset-password-form" title="Resetuj Hasło">
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <div className="text-right text-sm mt-4">
        <Link data-test="login-link" href={createUrl({ name: 'login' })}>
          Wróć do logowania
        </Link>
      </div>
    </FullPageForm>
  );
}
