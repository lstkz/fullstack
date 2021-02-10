import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Validator } from 'src/common/Validator';
import { ContextFormInput } from 'src/components/FormInput';
import { Heading } from 'src/components/Heading';
import { SimpleModal } from 'src/components/SimpleModal';
import { useFormSubmitState } from 'src/hooks/useFormSubmitState';
import { api } from 'src/services/api';
import { useUser } from '../AuthModule';

interface EmailFormValues {
  email: string;
  confirmEmail: string;
}

export function EmailSection() {
  const user = useUser();
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);

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
      const ret = await api.user_updateEmail(values.email);
      if (ret.ok) {
        setIsConfirmVisible(true);
      }
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
      <SimpleModal
        testId="new-email-confirm-modal"
        isOpen={isConfirmVisible}
        bgColor="primary"
        title="Potwierdź maila"
        icon={<FontAwesomeIcon size="4x" icon={faEnvelope} />}
        header="Prawie gotowe!"
        description={
          <>
            Link potwierdzający został wysłany na Twój nowy adres email. <br />
            Potwierdź go, aby zmienić email.
          </>
        }
        close={() => {
          setIsConfirmVisible(false);
        }}
      />
    </>
  );
}
