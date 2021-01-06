import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Validator } from 'src/common/Validator';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import {
  UserInfoForm,
  UserInfoFormFields,
  validateUserInfoForm,
} from 'src/components/UserInfoForm';
import { useErrorModalActions } from '../ErrorModalModule';

export function UserInfoSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const errorModalActions = useErrorModalActions();

  const formMethods = useForm<UserInfoFormFields>({
    resolver: data => {
      return new Validator(data).touch(validateUserInfoForm).validate();
    },
  });
  const { handleSubmit } = formMethods;

  const onSubmit = async (values: UserInfoFormFields) => {
    setIsSubmitting(true);
    try {
      //
    } catch (e) {
      errorModalActions.show(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Heading type={5}>Informacje ogólne</Heading>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <UserInfoForm />
          <Button
            loading={isSubmitting}
            type="primary"
            htmlType="submit"
            size="small"
          >
            Zapisz
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
