import React from 'react';
import { Dashboard } from 'src/components/Dashboard';
import { CheckoutButtons } from './CheckoutButtons';
import { PaymentOptions } from './PaymentOptions';
import { CustomerInfo, SubscriptionPlan } from 'shared';
import { FormProvider, useForm } from 'react-hook-form';
import { useErrorModalActions } from '../ErrorModalModule';
import { api } from 'src/services/api';
import { OrderDetails } from './OrderDetails';
import { Validator } from 'src/common/Validator';
import { Heading } from 'src/components/Heading';
import {
  UserInfoForm,
  UserInfoFormFields,
  validateUserInfoForm,
} from 'src/components/UserInfoForm';
import { FormCheckbox } from 'src/components/FormCheckbox';
import Link from 'next/link';
import { createUrl } from 'src/common/url';
import { HeadTitle } from 'src/components/HeadTitle';

interface SubscriptionPageProps {
  subscriptionPlans: SubscriptionPlan[];
  info: CustomerInfo | null;
}
export interface SubscriptionFormValues extends UserInfoFormFields {
  acceptTerms: boolean;
  groupId: number;
  subscriptionPlanId: string;
}

export function SubscriptionPage(props: SubscriptionPageProps) {
  const { subscriptionPlans, info } = props;
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);
  const errorModalActions = useErrorModalActions();
  const formMethods = useForm<SubscriptionFormValues>({
    defaultValues: {
      ...(info ?? {}),
      subscriptionPlanId: subscriptionPlans.find(x => x.type === 'annual')?.id,
    },
    resolver: data => {
      return new Validator(data)
        .touch(validateUserInfoForm)
        .required('groupId', 'Wybierz formę płatności')
        .required('acceptTerms', 'Musisz zaakceptować regulamin')
        .validate();
    },
  });
  const { handleSubmit } = formMethods;

  const onSubmit = async (values: SubscriptionFormValues) => {
    setIsSubmitting(true);
    try {
      const { subscriptionPlanId, groupId, acceptTerms, ...customer } = values;
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
      <HeadTitle title="Kup abonament" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Dashboard>
          <div
            data-test="subscription-page"
            className="container grid md:grid-cols-12 gap-8 my-8 md:grid-rows-1 grid-flow-row-dense"
          >
            <div className="md:col-start-7 md:col-span-6 lg:col-start-8 lg:col-span-5">
              <OrderDetails subscriptionPlans={subscriptionPlans} />
            </div>
            <div className="md:col-start-1 md:col-span-6 lg:col-start-1 lg:col-span-7 ">
              <Heading className="mb-1" type={5}>
                Szczegóły płatności
              </Heading>
              <UserInfoForm />
              <PaymentOptions />
              <FormCheckbox name="acceptTerms">
                *Akceptuję{' '}
                <Link
                  href={createUrl({
                    name: 'tos',
                  })}
                >
                  <a>regulamin</a>
                </Link>
                .
              </FormCheckbox>
              <CheckoutButtons isSubmitting={isSubmitting} isDone={isDone} />
            </div>
          </div>
        </Dashboard>
      </form>
    </FormProvider>
  );
}
