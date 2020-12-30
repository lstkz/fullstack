import * as React from 'react';
import { ButtonNext } from 'src/components/ButtonNext';

interface CheckoutButtonsProps {
  isSubmitting: boolean;
  isDone: boolean;
}

export function CheckoutButtons(props: CheckoutButtonsProps) {
  const { isSubmitting, isDone } = props;
  return (
    <div>
      <ButtonNext
        type="primary"
        htmlType="submit"
        loading={isSubmitting || isDone}
      >
        {isDone ? 'Przekierowywanie do płatności...' : ' Zamawiam i płacę'}
      </ButtonNext>
    </div>
  );
}
