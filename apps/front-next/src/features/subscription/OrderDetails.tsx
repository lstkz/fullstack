import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { SubscriptionPlan } from 'shared';
import { Heading } from 'src/components/Heading';
import { Select } from 'src/components/Select';
import { SubscriptionFormValues } from './SubscriptionPage';

interface OrderDetailsProps {
  subscriptionPlans: SubscriptionPlan[];
}

function _round(n: number) {
  return Math.round(n * 100) / 100;
}

function _formatPrice(n: number) {
  if (typeof Intl == 'undefined') {
    return n.toFixed(2) + ' zł';
  }
  return new Intl.NumberFormat('pl-Pl', {
    style: 'currency',
    currency: 'PLN',
  }).format(_round(n));
}

function Row(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className="pt-4 mt-4 border-t border-gray-200 grid grid-cols-2"
    />
  );
}

export function OrderDetails(props: OrderDetailsProps) {
  const { subscriptionPlans } = props;
  const {
    setValue,
    watch,
    register,
  } = useFormContext<SubscriptionFormValues>();

  const planType = watch('subscriptionPlanId');
  React.useEffect(() => {
    register('subscriptionPlanId');
  }, []);

  const options = React.useMemo(() => {
    return subscriptionPlans.map(item => {
      const name = `${item.name} - ${item.pricePerMonth}zł na miesiąc`;
      return {
        value: item.id,
        label: name,
      };
    });
  }, [subscriptionPlans]);
  const selectedPlan = subscriptionPlans.find(x => x.id === planType)!;

  return (
    <div className="flex flex-col relative shadow-lg bg-white border border-gray-200 rounded-md md:sticky md:top-6">
      <div className="py-4 px-6 border-b border-gray-200">
        <Heading type={6}>Wybierz plan</Heading>
      </div>
      <div className="p-6">
        <Select
          id="subscriptionPlanId"
          onChange={opt => setValue('subscriptionPlanId', opt!.value as any)}
          valueColor="#152c5b"
          value={options.find(x => x.value === planType)}
          options={options}
        />
        <Row>
          <div className="font-semibold text-sm">Cena netto:</div>
          <div className="font-semibold text-sm text-right">
            {_formatPrice(selectedPlan.price.net)}
          </div>
        </Row>
        <Row>
          <div className="font-semibold text-sm">VAT (23%):</div>
          <div className="font-semibold text-sm text-right">
            {_formatPrice(selectedPlan.price.vat)}
          </div>
        </Row>
        <Row>
          <div className="font-semibold text-heading text-lg">Do zapłaty:</div>
          <div className="font-semibold text-heading text-lg text-right">
            {_formatPrice(selectedPlan.price.total)}
          </div>
        </Row>
      </div>
    </div>
  );
}
