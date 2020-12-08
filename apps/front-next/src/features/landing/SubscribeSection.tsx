import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createUrl } from 'src/common/url';
import { Container } from 'src/components/Container';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { InputGroup } from 'src/components/InputGroup';
import { MEDIA_MD_NEXT, Theme } from 'src/Theme';
import { FormInput } from 'src/components/FormInput';
import Link from 'next/link';
import { InputFeedback } from 'src/components/Input';
import { useErrorModalActions } from 'src/features/ErrorModalModule';
import { api } from 'src/services/api';
import { useSubscriptionModalsActions } from 'src/features/SubscriptionModalsModule';
import styled from 'styled-components';
import { EMAIL_REGEX } from 'shared';

const Desc = styled.div`
  color: ${Theme.text_muted_color};
`;

const Text = styled.div`
  color: ${Theme.text_muted_color};
  font-size: 0.8rem;
`;

interface FormValues {
  email: string;
}

const FormWrapper = styled.div`
  margin: 2rem auto 0.75rem;
  max-width: 600px;
`;

const Form = styled.form`
  display: block;
  background: ${Theme.section_secondary};
  padding: 4.5rem 0;
  text-align: center;
  @media ${MEDIA_MD_NEXT} {
    padding: 4.5rem;
  }
`;

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
    <Form onSubmit={handleSubmit(onSubmit)} id="subscribe-section">
      <Container>
        <Heading type={2}>Dołącz do mailingu</Heading>
        <Desc>
          Platforma jest w budowie. Podaj swojego maila, a dostaniesz
          powiadomienie jak wystartujemy.
          <br />
          Start jest szacowany na początek 2021 roku.
        </Desc>
        <FormWrapper>
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
        </FormWrapper>
        <Text>
          Zapisując się to newslettera wyrażasz zgodę na przetwarzanie Twoich
          danych zgodnie z{' '}
          <Link href={createUrl({ name: 'privacy' })}>
            polityką prywatności
          </Link>
          .
        </Text>
      </Container>
    </Form>
  );
}
