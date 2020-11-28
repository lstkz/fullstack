import * as React from 'react';
import { Button } from 'src/components/Button';
import { Col, Row } from 'src/components/Grid';
import { Heading } from 'src/components/Heading';
import { MEDIA_MD, Theme } from 'src/Theme';
import styled from 'styled-components';
import { useActions } from 'typeless';
import { CheckoutActions, getCheckoutState } from '../interface';

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

const AmountWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 2rem;
  ${Price} {
    margin: 0 0.5rem;
  }
  ${Button} {
    padding: 0;
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const CenteredCol = styled(Col)`
  display: flex;
  align-items: center;
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
  const { setCount } = useActions(CheckoutActions);
  const { count, priceNet } = getCheckoutState.useState();
  const totalNetto = priceNet * count;
  const totalVat = _round(totalNetto * 0.23);
  const total = totalNetto + totalVat;

  const leftSize = 8;
  const rightSize = 12 - leftSize;
  return (
    <div className={className}>
      <Header>
        <Heading type={6}>Zamówienie</Heading>
      </Header>
      <Body>
        <Row>
          <Col sm={leftSize}>
            <Text>Typescript i podstawy algorytmiki</Text>
          </Col>
          <Col sm={rightSize}>
            <Price>{_formatPrice(priceNet)}</Price>
          </Col>
        </Row>
        <Row mt={2}>
          <CenteredCol sm={leftSize}>
            <Text>Ilość</Text>
          </CenteredCol>
          <Col sm={rightSize}>
            <AmountWrapper>
              <Button
                size="extra-small"
                type="secondary"
                onClick={() => {
                  if (count > 1) {
                    setCount(count - 1);
                  }
                }}
              >
                -
              </Button>
              <Price>{count}</Price>
              <Button
                size="extra-small"
                type="secondary"
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                +
              </Button>
            </AmountWrapper>
          </Col>
        </Row>
        <BorderRow>
          <Col sm={leftSize}>
            <Text>Cena netto:</Text>
          </Col>
          <Col sm={rightSize}>
            <Price>{_formatPrice(totalNetto)}</Price>
          </Col>
        </BorderRow>
        <BorderRow>
          <Col sm={leftSize}>
            <Text>VAT (23%):</Text>
          </Col>
          <Col sm={rightSize}>
            <Price>{_formatPrice(totalVat)}</Price>
          </Col>
        </BorderRow>
        <BorderRow>
          <Col sm={leftSize}>
            <BigText>Do zapłaty:</BigText>
          </Col>
          <Col sm={rightSize}>
            <BigText right>{_formatPrice(total)}</BigText>
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
