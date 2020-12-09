import React from 'react';
import { Container } from 'src/components/Container';
import { Dashboard } from 'src/components/Dashboard';
import { ContextFormInput } from 'src/components/FormInput';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { CheckoutButtons } from './CheckoutButtons';
import { PaymentOptions } from './PaymentOptions';
import { SubscriptionPlan } from 'shared';
import { FormProvider, useForm } from 'react-hook-form';
import { useErrorModalActions } from '../ErrorModalModule';
import { api } from 'src/services/api';
import { OrderDetails } from './OrderDetails';
import { Validator } from 'src/common/Validator';

interface SubscriptionPageProps {
  subscriptionPlans: SubscriptionPlan[];
}
export interface SubscriptionFormValues {
  firstName: string;
  lastName: string;
  companyName: string;
  companyVat: string;
  address: string;
  postalCode: string;
  city: string;
  groupId: number;
  subscriptionPlanId: string;
}

export function SubscriptionPage(props: SubscriptionPageProps) {
  const { subscriptionPlans } = props;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const errorModalActions = useErrorModalActions();
  const formMethods = useForm<SubscriptionFormValues>({
    defaultValues: {
      subscriptionPlanId: subscriptionPlans.find(x => x.type === 'annual')?.id,
    },
    resolver: data => {
      return new Validator(data)
        .required('firstName')
        .required('lastName')
        .required('address')
        .required('postalCode')
        .required('city')
        .required('groupId', 'Wybierz formę płatności')
        .custom('companyName', () => {
          if (data.companyVat && !data.companyName) {
            return 'Pole wymagane jeśli NIP nie jest puste';
          }
          return null;
        })
        .custom('companyVat', () => {
          if (!data.companyVat && data.companyName) {
            return 'Pole wymagane jeśli Nazwa firmy nie jest puste';
          }
          return null;
        })
        .validate();
    },
  });
  const { handleSubmit } = formMethods;

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsSubmitting(true);
    try {
      const { subscriptionPlanId, groupId, ...customer } = values;
      const { paymentUrl } = await api.subscription_purchase({
        subscriptionPlanId,
        tpayGroup: groupId,
        customer,
      });
      setIsDone(true);
      setTimeout(() => {
        window.location.href = paymentUrl;
      });
    } catch (e) {
      errorModalActions.show(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dashboard>
          <Container>
            <Row my={5}>
              <Col lg={7} flexOrder={2} lgFlexOrder={1}>
                <Heading mb={1} type={5}>
                  Szczegóły płatności
                </Heading>
                <Row>
                  <Col md={6}>
                    <ContextFormInput name="firstName" label="Imię" />
                  </Col>
                  <Col md={6}>
                    <ContextFormInput name="lastName" label="Nazwisko" />
                  </Col>
                </Row>
                <ContextFormInput
                  name="companyName"
                  label="Nazwa firmy (opcjonalnie)"
                />
                <ContextFormInput name="companyVat" label="NIP (opcjonalnie)" />
                <ContextFormInput
                  name="address"
                  label="Adres"
                  placeholder="Ulica, numer budyku i lokalu"
                />
                <Row>
                  <Col md={6}>
                    <ContextFormInput
                      name="postalCode"
                      label="Kod pocztowy"
                      placeholder="00-000"
                    />
                  </Col>
                  <Col md={6}>
                    <ContextFormInput name="city" label="Miasto" />
                  </Col>
                </Row>
                <PaymentOptions />
                <CheckoutButtons isSubmitting={isSubmitting} isDone={isDone} />
              </Col>
              <Col lg={5} flexOrder={1} lgFlexOrder={2} mb={5}>
                <OrderDetails subscriptionPlans={subscriptionPlans} />
              </Col>
            </Row>
          </Container>
        </Dashboard>
      </form>
    </FormProvider>
  );
}
