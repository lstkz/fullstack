import * as React from 'react';
import { createUrl } from 'src/common/url';
import { Link } from 'src/new-components/Link';
import { Button } from 'src/new-components/Button';
import { FormCheckbox } from 'src/new-components/FormCheckbox';
import { Spacer } from 'src/new-components/_spacer';
import styled from 'styled-components';
import { getCheckoutState } from '../interface';

interface CheckoutButtonsProps {
  className?: string;
}

const _CheckoutButtons = (props: CheckoutButtonsProps) => {
  const { className } = props;
  const { isSubmitting, isDone } = getCheckoutState.useState();
  return (
    <div className={className}>
      <FormCheckbox id="terms" name="agreeTerms">
        Akceptuję <a>regulamin sklepu</a> i{' '}
        <a>regulamin platformy edukacyjnej</a>. *
      </FormCheckbox>
      <FormCheckbox id="newsletter" name="agreeNewsletter">
        Zapisz mnie do newslettera
      </FormCheckbox>
      <Spacer my={2}>
        Twoje dane osobowe będą użyte do przetworzenia twojego zamówienia,
        obsługi twojej wizyty na naszej stronie oraz dla innych celów o których
        mówi nasza{' '}
        <Link href={createUrl({ name: 'privacy' })}>polityka prywatności</Link>.
      </Spacer>
      <Button type="primary" htmlType="submit" loading={isSubmitting || isDone}>
        {isDone ? 'Przekierowywanie do płatności...' : ' Zamawiam i płacę'}
      </Button>
    </div>
  );
};

export const CheckoutButtons = styled(_CheckoutButtons)`
  display: block;
`;
