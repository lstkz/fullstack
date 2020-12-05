import React from 'react';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { FormInput } from 'src/components/FormInput';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import styled from 'styled-components';
import { useActions } from 'typeless';
import {
  SubscriptionFormActions,
  SubscriptionFormProvider,
  useSubscriptionForm,
} from '../subscription-form';
import { getSubscriptionState } from '../interface';
import { useCheckoutModule } from '../module';
import { CheckoutButtons } from './CheckoutButtons';
import { OrderDetails } from './OrderDetails';
import { PaymentOptions } from './PaymentOptions';

const Loader = styled.div`
  padding: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export function SubscriptionView() {
  useSubscriptionForm();
  useCheckoutModule();
  const { submit } = useActions(SubscriptionFormActions);
  const { subscriptionPlans } = getSubscriptionState.useState();
  if (!subscriptionPlans.length) {
    return (
      <Dashboard>
        <Loader>
          <SpinnerBoarder />
        </Loader>
      </Dashboard>
    );
  }

  return (
    <SubscriptionFormProvider>
      <form
        onSubmit={e => {
          e.preventDefault();
          submit();
        }}
      >
        <Dashboard>
          <Container>
            <Row my={5}>
              <Col lg={7} flexOrder={2} lgFlexOrder={1}>
                <Heading mb={1} type={5}>
                  Szczegóły płatności
                </Heading>
                <Row>
                  <Col md={6}>
                    <FormInput name="firstName" label="Imię" />
                  </Col>
                  <Col md={6}>
                    <FormInput name="lastName" label="Nazwisko" />
                  </Col>
                </Row>
                <FormInput
                  name="companyName"
                  label="Nazwa firmy (opcjonalnie)"
                />
                <FormInput name="companyVat" label="NIP (opcjonalnie)" />
                <FormInput
                  name="address"
                  label="Adres"
                  placeholder="Ulica, numer budyku i lokalu"
                />
                <Row>
                  <Col md={6}>
                    <FormInput
                      name="postalCode"
                      label="Kod pocztowy"
                      placeholder="00-000"
                    />
                  </Col>
                  <Col md={6}>
                    <FormInput name="city" label="Miasto" />
                  </Col>
                </Row>
                <PaymentOptions />
                <CheckoutButtons />
              </Col>
              <Col lg={5} flexOrder={1} lgFlexOrder={2} mb={5}>
                <OrderDetails />
              </Col>
            </Row>
          </Container>
        </Dashboard>
      </form>
    </SubscriptionFormProvider>
  );
}
