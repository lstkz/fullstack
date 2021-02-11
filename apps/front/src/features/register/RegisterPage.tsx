import React from 'react';
import * as R from 'remeda';
import { Alert } from 'src/components/Alert';
import { SocialFormButtons } from 'src/components/SocialFormButtons';
import { FullPageForm } from 'src/components/FullPageForm';
import { ContextFormInput } from 'src/components/FormInput';
import { createUrl } from 'src/common/url';
import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';
import { PASSWORD_MIN_LENGTH } from 'shared';
import { api } from 'src/services/api';
import { useAuthForm } from 'src/hooks/useAuthForm';
import { Button } from 'src/components/Button';
import { HeadTitle } from 'src/components/HeadTitle';
import { FormCheckbox } from 'src/components/FormCheckbox';
import { Validator } from 'src/common/Validator';
import { Checkbox } from 'src/components/Checkbox';
import { fbTrack } from 'src/track';

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
}

export function RegisterPage() {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      subscribeNewsletter: false,
      acceptTerms: false,
    },
    resolver: data => {
      return new Validator(data)
        .required('email', 'Podaj adres email')
        .email('email')
        .required('password', 'Podaj hasło')
        .minLength('password', PASSWORD_MIN_LENGTH)
        .required('confirmPassword', 'Podaj hasło')
        .required('acceptTerms', 'Musisz zaakceptować regulamin')
        .custom('confirmPassword', data => {
          if (data.password !== data.confirmPassword) {
            return 'Hasła muszą być takie same';
          }
          return null;
        })
        .validate();
    },
  });
  const redirectUrl = createUrl({ name: 'subscription' });
  const { error, isSubmitting, onSubmit } = useAuthForm({
    isRegister: true,
    submit: () =>
      api
        .user_register(R.omit(getValues(), ['acceptTerms', 'confirmPassword']))
        .then(ret => {
          fbTrack('CompleteRegistration');
          return ret;
        }),
    redirectUrl,
  });
  const { watch, handleSubmit, getValues, setValue, trigger } = formMethods;
  const acceptTerms = watch('acceptTerms');
  const subscribeNewsletter = watch('subscribeNewsletter');

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
      <FormProvider {...formMethods}>
        <HeadTitle title="Rejestracja" />
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <Alert testId="register-error" type="error">
              {error}
            </Alert>
          )}
          <ContextFormInput
            testId="register-input"
            id="email"
            name="email"
            label="Email"
            placeholder="name@example.com"
            autoComplete="email"
            maxLength={50}
          />
          <ContextFormInput
            testId="password-input"
            id="password"
            name="password"
            label="Hasło"
            placeholder="********"
            type="password"
            autoComplete="new-password"
            maxLength={50}
          />
          <ContextFormInput
            testId="confirm-password-input"
            id="confirmPassword"
            name="confirmPassword"
            label="Powtórz hasło"
            placeholder="********"
            type="password"
            autoComplete="new-password"
            maxLength={50}
          />
          <Checkbox
            id="check-all"
            testId="check-all"
            isChecked={acceptTerms && subscribeNewsletter}
            onChange={isChecked => {
              setValue('subscribeNewsletter', isChecked);
              setValue('acceptTerms', isChecked);
            }}
            className="mb-1"
          >
            Zaznacz wszystko.
          </Checkbox>
          <FormCheckbox name="acceptTerms" className="mb-1">
            *Akceptuję{' '}
            <a
              href={createUrl({
                name: 'tos',
              })}
              target="_blank"
            >
              regulamin
            </a>
            .
          </FormCheckbox>
          <FormCheckbox name="subscribeNewsletter">
            Chcę otrzymywać informacje o nowościach, webinarach i nowych
            lekcjach.
          </FormCheckbox>
          <Button
            testId="register-submit"
            type="primary"
            block
            loading={isSubmitting}
            htmlType="submit"
          >
            Załóż konto
          </Button>
          <SocialFormButtons
            isValid={acceptTerms}
            validate={() => {
              void trigger('acceptTerms');
            }}
            subscribeNewsletter={subscribeNewsletter}
            redirectUrl={redirectUrl}
            source="register"
          />
        </form>
      </FormProvider>
    </FullPageForm>
  );
}
