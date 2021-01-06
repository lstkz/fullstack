import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Validator } from 'src/common/Validator';
import { Heading } from 'src/components/Heading';
import {
  UserInfoForm,
  UserInfoFormFields,
  validateUserInfoForm,
} from 'src/components/UserInfoForm';
import { useFormSubmitState } from 'src/hooks/useFormSubmitState';
import { api } from 'src/services/api';

interface UserInfoSectionProps {
  info: UserInfoFormFields;
}

export function UserInfoSection(props: UserInfoSectionProps) {
  const formMethods = useForm<UserInfoFormFields>({
    defaultValues: props.info,
    resolver: data => {
      return new Validator(data).touch(validateUserInfoForm).validate();
    },
  });
  const { handleSubmit } = formMethods;
  const { onSubmit, submitButton } = useFormSubmitState(
    (values: UserInfoFormFields) => {
      return api.user_updateGeneralInfo(values);
    }
  );

  return (
    <>
      <Heading type={5}>Informacje ogólne</Heading>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserInfoForm />
          {submitButton}
        </form>
      </FormProvider>
    </>
  );
}
