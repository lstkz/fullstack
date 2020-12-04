import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Container } from 'src/components/Container';
import { Link } from 'src/components/Link';
import { Button } from 'src/components/Button';
import { Heading } from 'src/components/Heading';
import { InputGroup } from 'src/components/InputGroup';
import { MEDIA_MD, Theme } from 'src/Theme';
import styled from 'styled-components';
import {
  EmailSubscribeFormActions,
  EmailSubscribeFormProvider,
} from '../../email-subscription/emailSubscribe-form';
import { FormInput } from 'src/components/FormInput';
import { useActions } from 'typeless';
import { FormInputError } from 'src/components/FormInputError';
import { getEmailSubscriptionState } from 'src/features/email-subscription/interface';

const Desc = styled.div`
  color: ${Theme.text_muted_color};
`;

const Text = styled.div`
  color: ${Theme.text_muted_color};
  font-size: 0.8rem;
`;

interface SubscribeSectionProps {
  className?: string;
}

const FormWrapper = styled.div`
  margin: 2rem auto 0.75rem;
  max-width: 600px;
`;

const _SubscribeSection = (props: SubscribeSectionProps) => {
  const { className } = props;
  const { isSubmitting } = getEmailSubscriptionState.useState();
  const { submit } = useActions(EmailSubscribeFormActions);
  return (
    <EmailSubscribeFormProvider>
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
        className={className}
        id="subscribe-section"
      >
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
                  noMargin
                  noFeedback
                  name="email"
                  placeholder="Twój email"
                />
              }
              append={
                <Button type="primary" htmlType="submit" loading={isSubmitting}>
                  Zapisz się
                </Button>
              }
            />
            <FormInputError name="email" />
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
      </form>
    </EmailSubscribeFormProvider>
  );
};

export const SubscribeSection = styled(_SubscribeSection)`
  display: block;
  background: ${Theme.section_secondary};
  padding: 4.5rem 0;
  text-align: center;
  ${MEDIA_MD} {
    padding: 4.5rem;
  }
`;
