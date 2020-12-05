import * as React from 'react';
import { Button } from 'src/components/Button';
import styled from 'styled-components';
import { getSubscriptionState } from '../interface';

interface CheckoutButtonsProps {
  className?: string;
}

const _CheckoutButtons = (props: CheckoutButtonsProps) => {
  const { className } = props;
  const { isSubmitting, isDone } = getSubscriptionState.useState();
  return (
    <div className={className}>
      <Button type="primary" htmlType="submit" loading={isSubmitting || isDone}>
        {isDone ? 'Przekierowywanie do płatności...' : ' Zamawiam i płacę'}
      </Button>
    </div>
  );
};

export const CheckoutButtons = styled(_CheckoutButtons)`
  display: block;
`;
