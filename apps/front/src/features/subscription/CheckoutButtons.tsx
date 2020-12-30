import * as React from 'react';
import { Button } from 'src/components/Button';

interface CheckoutButtonsProps {
  isSubmitting: boolean;
  isDone: boolean;
}

export function CheckoutButtons(props: CheckoutButtonsProps) {
  const { isSubmitting, isDone } = props;
  return (
    <div>
      <Button type="primary" htmlType="submit" loading={isSubmitting || isDone}>
        {isDone ? 'Przekierowywanie do płatności...' : ' Zamawiam i płacę'}
      </Button>
    </div>
  );
}
