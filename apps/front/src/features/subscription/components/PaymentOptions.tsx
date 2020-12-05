import * as React from 'react';
import Color from 'tinycolor2';
import { Heading } from 'src/components/Heading';
import { SpinnerBoarder } from 'src/components/SpinnerBoarder';
import { MEDIA_MD, Theme } from 'src/Theme';
import styled, { css } from 'styled-components';
import { useActions } from 'typeless';
import {
  SubscriptionFormActions,
  getSubscriptionFormState,
} from '../subscription-form';
import { getSubscriptionState } from '../interface';
import { FormInputError } from 'src/components/FormInputError';

interface PaymentOptionsProps {
  className?: string;
}

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 0;
`;

const Item = styled.button<{ selected?: boolean }>`
  padding: 0.5rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  border: 1px solid ${Theme.gray_200};
  border-radius: 0.375rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem
      ${Color(Theme.primary).setAlpha(0.25).toRgbString()};
  }
  ${props =>
    props.selected &&
    css`
      border-color: ${Theme.primary};
    `}

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
  const { tpayGroups } = getSubscriptionState.useState();
  const { change } = useActions(SubscriptionFormActions);
  const {
    values: { groupId },
  } = getSubscriptionFormState.useState();
  return (
    <div className={className} id="groupId">
      <Heading mb={2} type={5} id="payment-options-label">
        Forma płatności
      </Heading>
      {!tpayGroups ? (
        <SpinnerWrapper>
          <SpinnerBoarder />
        </SpinnerWrapper>
      ) : (
        <>
          <Grid role="radiogroup" aria-labelledby="payment-options-label">
            {tpayGroups.map(item => (
              <Item
                type="button"
                key={item.id}
                role="radio"
                aria-checked={item.id === groupId}
                selected={item.id === groupId}
                onClick={() => change('groupId', item.id)}
                aria-label={item.name}
              >
                <img
                  role="presentation"
                  alt={item.name}
                  title={item.name}
                  src={item.img}
                />
              </Item>
            ))}
          </Grid>
          <FormInputError name="groupId" />
        </>
      )}
    </div>
  );
};

export const PaymentOptions = styled(_PaymentOptions)`
  display: block;
  margin: 1rem 0;
`;
