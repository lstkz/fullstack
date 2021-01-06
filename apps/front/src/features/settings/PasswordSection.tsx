import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PASSWORD_MIN_LENGTH } from 'shared';
import { Validator } from 'src/common/Validator';
import { ContextFormInput } from 'src/components/FormInput';
import { Heading } from 'src/components/Heading';
import { useFormSubmitState } from 'src/hooks/useFormSubmitState';
import { api } from 'src/services/api';

interface PasswordFormValues {
  password: string;
  confirmPassword: string;
}

export function PasswordSection() {
  const formMethods = useForm<PasswordFormValues>({
    resolver: data => {
      return new Validator(data)
        .required('password')
        .required('confirmPassword')
        .minLength('password', PASSWORD_MIN_LENGTH)
        .minLength('confirmPassword', PASSWORD_MIN_LENGTH)
        .custom('confirmPassword', () => {
          if (data.password !== data.confirmPassword) {
            return 'Hasła być takie same';
          }
          return null;
        })
        .validate();
    },
  });
  const { handleSubmit } = formMethods;

  const { onSubmit, submitButton } = useFormSubmitState(
    async (values: PasswordFormValues) => {
      await api.user_updatePassword(values.password);
    }
  );

  return (
    <>
      <Heading type={5} className="mt-6">
        Zmień Hasło
      </Heading>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContextFormInput
            autoComplete="new-password"
            type="password"
            name="password"
            label="Hasło"
          />
          <ContextFormInput
            autoComplete="new-password"
            type="password"
            name="confirmPassword"
            label="Potwórz hasło"
          />
          {submitButton}
        </form>
      </FormProvider>
    </>
  );
}
