import { Link } from 'gatsby';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { SubscriptionResult } from 'shared';
import styled from 'styled-components';
import { api } from '../services/api';
import { Button } from './Button';
import { EmailMessage } from './EmailMessage';
import { FormInput } from './FormInput';
import { Input } from './Input';
import { MailIcon } from './MailIcon';
import { Modal } from './Modal';
import { SidebarBox } from './SidebarBox';

interface NewsletterBoxProps {
  className?: string;
}

interface NewsletterForm {
  email: string;
  name: string;
}

const Info = styled.div`
  font-size: 12px;
  margin-top: 15px;
`;

const _NewsletterBox = (props: NewsletterBoxProps) => {
  const { className } = props;
  const { handleSubmit, register, errors, reset } = useForm<NewsletterForm>();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);
  const [
    subscriptionResult,
    setSubscriptionResult,
  ] = React.useState<SubscriptionResult | null>(null);
  return (
    <SidebarBox title="Fullstack Newsletter" className={className}>
      <Modal
        isOpen={isConfirmationOpen}
        close={() => {
          setIsConfirmationOpen(false);
        }}
        title={subscriptionResult?.result === 'ok' ? 'Potwierdź maila' : 'Oops'}
        size="md"
      >
        {subscriptionResult?.result === 'ok' ? (
          <EmailMessage>
            Link potwierdzający został wysłany na Twój adres email.
            <br />
            Potwierdź go, aby otrzymywać newsletter.
          </EmailMessage>
        ) : (
          <EmailMessage>Już subskrypujesz naszą stronę 😉</EmailMessage>
        )}
      </Modal>
      <p>Dołącz do newslettera i dostawaj newsy na bieżąco.</p>
      <form
        onSubmit={handleSubmit(async values => {
          setIsSubmitting(true);
          try {
            const result = await api
              .subscription_subscribe(values.name, values.email)
              .toPromise();
            setSubscriptionResult(result);
            setIsConfirmationOpen(true);
            reset();
          } catch (e) {
            console.error(e);
          }
          setIsSubmitting(false);
        })}
      >
        <FormInput error={errors.name?.message}>
          <Input
            placeholder="Imię"
            maxLength={50}
            name="name"
            ref={register({
              required: 'Pole wymagane',
            })}
          />
        </FormInput>
        <FormInput error={errors.email?.message}>
          <Input
            placeholder="email@domena.pl"
            maxLength={50}
            name="email"
            ref={register({
              required: 'Pole wymagane',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Niepoprawny email',
              },
            })}
          />
        </FormInput>
        <Button block size="lg" type="solid" disabled={isSubmitting}>
          Dołącz
        </Button>
      </form>
      <Info>
        Zapisując się to newslettera wyrażasz zgodę na przetwarzanie Twoich
        danych zgodnie z <Link to="/privacy">polityką prywatności</Link>.
      </Info>
    </SidebarBox>
  );
};

export const NewsletterBox = styled(_NewsletterBox)`
  display: block;
  p {
    margin: 15px 0;
  }
`;
