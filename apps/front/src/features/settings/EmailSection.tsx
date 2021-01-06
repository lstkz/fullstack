import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Validator } from 'src/common/Validator';
import { ContextFormInput } from 'src/components/FormInput';
import { Heading } from 'src/components/Heading';
import { useFormSubmitState } from 'src/hooks/useFormSubmitState';
import { api } from 'src/services/api';
import { useAuthActions, useUser } from '../AuthModule';

interface EmailFormValues {
  email: string;
  confirmEmail: string;
}

export function EmailSection() {
  const user = useUser();
  const { updateEmail } = useAuthActions();

  const formMethods = useForm<EmailFormValues>({
    defaultValues: {
      email: user?.email,
    },
    resolver: data => {
      return new Validator(data)
        .required('email')
        .required('confirmEmail')
        .email('email')
        .email('confirmEmail')
        .custom('confirmEmail', () => {
          if (data.email.toLowerCase() !== data.confirmEmail.toLowerCase()) {
            return 'Emaile muszą być takie same';
          }
          return null;
        })
        .validate();
    },
  });
  const { handleSubmit } = formMethods;

  const { onSubmit, submitButton } = useFormSubmitState(
    async (values: EmailFormValues) => {
      await api.user_updateEmail(values.email);
      updateEmail(values.email);
    }
  );

  return (
    <>
      <Heading type={5}>Zmień Email</Heading>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContextFormInput name="email" label="Email" />
          <ContextFormInput name="confirmEmail" label="Potwórz email" />
          {submitButton}
        </form>
      </FormProvider>
    </>
  );
}
