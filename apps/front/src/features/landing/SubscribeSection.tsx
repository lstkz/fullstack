import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createUrl } from 'src/common/url';
import { InputGroup } from 'src/components/InputGroup';
import { FormInput } from 'src/components/FormInput';
import Link from 'next/link';
import { InputFeedback } from 'src/components/Input';
import { useErrorModalActions } from 'src/features/ErrorModalModule';
import { EMAIL_REGEX } from 'shared';
import { Heading } from 'src/components/Heading';
import { Button } from 'src/components/Button';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SimpleModal } from 'src/components/SimpleModal';

interface FormValues {
  email: string;
}

export function SubscribeSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { errors, register, handleSubmit, reset } = useForm<FormValues>();
  const [isConfirmVisible, setIsConfirmVisible] = React.useState(false);
  const errorModalActions = useErrorModalActions();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(
        'https://api.convertkit.com/v3/forms/2049944/subscribe?api_key=8d_N54q7cE1ILXSPyYYetA',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
          }),
        }
      );
      if (res.status != 200) {
        throw new Error('Cannot subscribe');
      }
      setIsConfirmVisible(true);
      reset();
    } catch (e) {
      errorModalActions.show(e);
    }
    setIsSubmitting(false);
  };
  return (
    <form
      className="bg-gray-100 py-16 text-center md:px-16"
      onSubmit={handleSubmit(onSubmit)}
      id="subscribe-section"
    >
      <SimpleModal
        testId="newsletter-confirm-modal"
        isOpen={isConfirmVisible}
        bgColor="primary"
        title="Potwierdź maila"
        icon={<FontAwesomeIcon size="4x" icon={faEnvelope} />}
        header="Prawie gotowe!"
        description={
          <>
            Link potwierdzający został wysłany na Twój nowy adres email. <br />
            Potwierdź go, aby otrzymać kod promocyjny.
          </>
        }
        close={() => {
          setIsConfirmVisible(false);
        }}
      />
      <div className="container">
        <Heading type={2}>Dołącz do mailingu</Heading>
        <div className="text-gray-600">
          Otrzymasz 20% zniżki na zakup abonamentu!
        </div>
        <div className="mt-8 mx-auto mb-3 max-w-xl">
          <InputGroup
            size="large"
            input={
              <FormInput
                testId="subscribe-email-input"
                noMargin
                noFeedback
                name="email"
                placeholder="Twój email"
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
              />
            }
            append={
              <Button
                testId="subscribe-btn"
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                Zapisz się
              </Button>
            }
          />
          <InputFeedback color="danger" testId="subscribe-error">
            {errors.email?.message}
          </InputFeedback>
        </div>
        <div className="text-gray-600 text-sm">
          Zapisując się do newslettera wyrażasz zgodę na przetwarzanie Twoich
          danych zgodnie z{' '}
          <Link href={createUrl({ name: 'privacy' })}>
            polityką prywatności
          </Link>
          .
        </div>
      </div>
    </form>
  );
}
