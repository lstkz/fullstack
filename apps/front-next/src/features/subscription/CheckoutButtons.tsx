import * as React from 'react';
import { Button } from 'src/components/Button';
import styled from 'styled-components';

interface CheckoutButtonsProps {
  className?: string;
  isSubmitting: boolean;
  isDone: boolean;
}

const _CheckoutButtons = (props: CheckoutButtonsProps) => {
  const { className, isSubmitting, isDone } = props;
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
