import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Container } from 'src/components/Container';
import { Link } from 'src/components/Link';
import { Button } from 'src/new-components/Button';
import { Heading } from 'src/new-components/Heading';
import { InputGroup } from 'src/new-components/InputGroup';
import { MEDIA_MD, NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import {
  SubscribeFormActions,
  SubscribeFormProvider,
} from '../../subscription/subscribe-form';
import { FormInput } from 'src/new-components/FormInput';
import { useActions } from 'typeless';
import { FormInputError } from 'src/new-components/FormInputError';
import { getSubscriptionState } from 'src/features/subscription/interface';

const Desc = styled.div`
  color: ${NewTheme.text_muted_color};
`;

const Text = styled.div`
  color: ${NewTheme.text_muted_color};
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
  const { isSubmitting } = getSubscriptionState.useState();
  const { submit } = useActions(SubscribeFormActions);
  return (
    <SubscribeFormProvider>
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
    </SubscribeFormProvider>
  );
};

export const SubscribeSection = styled(_SubscribeSection)`
  display: block;
  background: ${NewTheme.section_secondary};
  padding: 4.5rem 0;
  text-align: center;
  ${MEDIA_MD} {
    padding: 4.5rem;
  }
`;
