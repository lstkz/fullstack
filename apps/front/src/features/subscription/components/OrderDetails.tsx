import * as React from 'react';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { Select } from 'src/components/Select';
import { MEDIA_MD, Theme } from 'src/Theme';
import styled from 'styled-components';
import { useActions } from 'typeless';
import { SubscriptionActions, getSubscriptionState } from '../interface';

interface OrderDetailsProps {
  className?: string;
}

const Header = styled.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid ${Theme.gray_200};
`;

const Body = styled.div`
  padding: 1.5rem;
`;

const Text = styled.div<{ right?: boolean }>`
  font-weight: 600;
  font-size: 80%;
  ${props => props.right && `text-align: right`}
`;

const BigText = styled.div<{ right?: boolean }>`
  font-weight: 600;
  color: ${Theme.headings_color};
  font-size: 1.1rem;
  ${props => props.right && `text-align: right;`}
`;

const Price = styled.div`
  font-weight: 600;
  font-size: 0.875rem;
  text-align: right;
`;

const BorderRow = styled(Row)`
  border-top: 1px solid ${Theme.gray_200};
  padding-top: 1rem;
  margin-top: 1rem;
`;

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

const _OrderDetails = (props: OrderDetailsProps) => {
  const { className } = props;
  const { changePlanType } = useActions(SubscriptionActions);
  const { subscriptionPlans, planType } = getSubscriptionState.useState();

  const leftSize = 8;
  const rightSize = 12 - leftSize;

  const options = React.useMemo(() => {
    return subscriptionPlans.map(item => {
      let name = `${item.name} - ${item.pricePerMonth}zł na miesiąc`;
      return {
        value: item.id,
        label: name,
      };
    });
  }, [subscriptionPlans]);
  const selectedPlan = subscriptionPlans.find(x => x.id === planType)!;

  return (
    <div className={className}>
      <Header>
        <Heading type={6}>Wybierz plan</Heading>
      </Header>
      <Body>
        <Select
          onChange={opt => changePlanType(opt!.value as any)}
          valueColor={Theme.headings_color}
          value={options.find(x => x.value === planType)}
          options={options}
        />
        <BorderRow>
          <Col sm={leftSize}>
            <Text>Cena netto:</Text>
          </Col>
          <Col sm={rightSize}>
            <Price>{_formatPrice(selectedPlan.price.net)}</Price>
          </Col>
        </BorderRow>
        <BorderRow>
          <Col sm={leftSize}>
            <Text>VAT (23%):</Text>
          </Col>
          <Col sm={rightSize}>
            <Price>{_formatPrice(selectedPlan.price.vat)}</Price>
          </Col>
        </BorderRow>
        <BorderRow>
          <Col sm={leftSize}>
            <BigText>Do zapłaty:</BigText>
          </Col>
          <Col sm={rightSize}>
            <BigText right>{_formatPrice(selectedPlan.price.total)}</BigText>
          </Col>
        </BorderRow>
      </Body>
    </div>
  );
};

export const OrderDetails = styled(_OrderDetails)`
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.375rem;
  ${MEDIA_MD} {
    position: sticky;
    top: 20px;
  }
`;
