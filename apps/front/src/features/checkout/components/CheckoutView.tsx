import React from 'react';
import { Container } from 'src/new-components/Container';
import { Dashboard } from 'src/new-components/Dashboard';
import { FormInput } from 'src/new-components/FormInput';
import { Col, Row } from 'src/new-components/Grid';
import { Heading } from 'src/new-components/Heading';
import { SpinnerBoarder } from 'src/new-components/SpinnerBoarder';
import styled from 'styled-components';
import { useActions } from 'typeless';
import {
  CheckoutFormActions,
  CheckoutFormProvider,
  useCheckoutForm,
} from '../checkout-form';
import { getCheckoutState } from '../interface';
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

export function CheckoutView() {
  useCheckoutForm();
  useCheckoutModule();
  const { submit } = useActions(CheckoutFormActions);
  const { course } = getCheckoutState.useState();
  if (!course) {
    return (
      <Dashboard>
        <Loader>
          <SpinnerBoarder />
        </Loader>
      </Dashboard>
    );
  }

  return (
    <CheckoutFormProvider>
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
                <FormInput name="email" label="Email" />
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
    </CheckoutFormProvider>
  );
}
