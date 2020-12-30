import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createUrl } from 'src/common/url';
import { InputGroup } from 'src/components/InputGroup';
import { FormInput } from 'src/components/FormInput';
import Link from 'next/link';
import { InputFeedback } from 'src/components/Input';
import { useErrorModalActions } from 'src/features/ErrorModalModule';
import { api } from 'src/services/api';
import { useSubscriptionModalsActions } from 'src/features/SubscriptionModalsModule';
import { EMAIL_REGEX } from 'shared';
import { Heading } from 'src/components/Heading';
import { Button } from 'src/components/Button';

interface FormValues {
  email: string;
}

export function SubscribeSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const { errors, register, handleSubmit, reset } = useForm<FormValues>();
  const errorModalActions = useErrorModalActions();
  const SubscriptionModalsActions = useSubscriptionModalsActions();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const ret = await api.emailSubscription_subscribe(null, data.email);
      if (ret.result === 'ok') {
        SubscriptionModalsActions.show('confirm');
        reset();
      } else {
        SubscriptionModalsActions.show('already-subscribed');
      }
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
      <div className="container">
        <Heading type={2}>Dołącz do mailingu</Heading>
        <div className="text-gray-600">
          Platforma jest w budowie. Podaj swojego maila, a dostaniesz
          powiadomienie jak wystartujemy.
          <br />
          Start jest szacowany na początek 2021 roku.
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
          <InputFeedback color="danger" data-test="subscribe-error">
            {errors.email?.message}
          </InputFeedback>
        </div>
        <div className="text-gray-600 text-sm">
          Zapisując się to newslettera wyrażasz zgodę na przetwarzanie Twoich
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
