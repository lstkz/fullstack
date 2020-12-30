import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { ContextFormInput } from 'src/components/FormInput';
import { CheckoutButtons } from './CheckoutButtons';
import { PaymentOptions } from './PaymentOptions';
import { SubscriptionPlan } from 'shared';
import { FormProvider, useForm } from 'react-hook-form';
import { useErrorModalActions } from '../ErrorModalModule';
import { api } from 'src/services/api';
import { OrderDetails } from './OrderDetails';
import { Validator } from 'src/common/Validator';
import { HeadingNext } from 'src/components/HeadingNext';

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
          <div className="container grid md:grid-cols-12 gap-8 my-8 md:grid-rows-1 grid-flow-row-dense">
            <div className="md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5">
              <OrderDetails subscriptionPlans={subscriptionPlans} />
            </div>
            <div className="md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-7 ">
              <HeadingNext className="mb-1" type={5}>
                Szczegóły płatności
              </HeadingNext>
              <div className="grid lg:grid-cols-2 lg:gap-4">
                <ContextFormInput name="firstName" label="Imię" />
                <ContextFormInput name="lastName" label="Nazwisko" />
              </div>
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
              <div className="grid lg:grid-cols-2 lg:gap-4">
                <ContextFormInput
                  name="postalCode"
                  label="Kod pocztowy"
                  placeholder="00-000"
                />
                <ContextFormInput name="city" label="Miasto" />
              </div>
              <PaymentOptions />
              <CheckoutButtons isSubmitting={isSubmitting} isDone={isDone} />
            </div>
          </div>
        </Dashboard>
      </form>
    </FormProvider>
  );
}
