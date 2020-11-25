import * as React from 'react';
import { Heading } from 'src/new-components/Heading';
import { SpinnerBoarder } from 'src/new-components/SpinnerBoarder';
import { MEDIA_MD, NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { getCheckoutState } from '../interface';

interface PaymentOptionsProps {
  className?: string;
}

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

const Item = styled.div`
  padding: 0.5rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  border: 1px solid ${NewTheme.gray_200};
  border-radius: 0.375rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: 1fr 1fr 1fr;
  ${MEDIA_MD} {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const _PaymentOptions = (props: PaymentOptionsProps) => {
  const { className } = props;
  const { tpayGroups } = getCheckoutState.useState();
  return (
    <div className={className}>
      <Heading mb={2} type={5}>
        Forma płatności
      </Heading>
      {!tpayGroups ? (
        <SpinnerWrapper>
          <SpinnerBoarder />
        </SpinnerWrapper>
      ) : (
        <Grid>
          {tpayGroups.map(item => (
            <Item>
              <img src={item.img} />
            </Item>
          ))}
        </Grid>
      )}
    </div>
  );
};

export const PaymentOptions = styled(_PaymentOptions)`
  display: block;
  margin: 1rem 0;
`;
