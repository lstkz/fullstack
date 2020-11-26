import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import Color from 'tinycolor2';
import styled, { css } from 'styled-components';
import { Small } from './Small';

type BaseProps = Pick<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'placeholder' | 'onChange' | 'type' | 'id'
>;

export interface InputProps extends BaseProps {
  className?: string;
  size?: 'small' | 'default' | 'large' | 'extra-large';
  feedback?: string;
  state?: 'error';
  label?: string;
  noMargin?: boolean;
}

const Label = styled.label`
  color: ${NewTheme.gray_600};
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const InputFeedback = styled(Small)`
  color: ${NewTheme.gray_600};
  margin-top: 0.5rem;
  text-align: left;
`;

const _Input = (props: InputProps) => {
  const { size, feedback, state, className, label, noMargin, ...rest } = props;
  return (
    <div className={className}>
      {label && <Label htmlFor={rest.id}>{label}</Label>}
      <input {...rest} />
      {feedback && (
        <InputFeedback color={state === 'error' ? 'danger' : undefined}>
          {feedback}
        </InputFeedback>
      )}
    </div>
  );
};

export const Input = styled(_Input)`
  ${props => !props.noMargin && 'margin-bottom: 1rem;'}

  input {
    display: block;
    width: 100%;
    height: calc(1.5em + 1.5rem + 2px);
    padding: 0.75rem 1.25rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${NewTheme.gray_700};
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid ${NewTheme.gray_300};
    border-radius: 0.375rem;
    box-shadow: inset 0 1px 1px rgba(31, 45, 61, 0.075);
    transition: all 0.2s ease;
    &::placeholder {
      color: ${NewTheme.gray_500};
    }

    &:focus {
      color: #4a5568;
      background-color: #fff;
      border-color: rgba(0, 138, 255, 0.5);
      outline: 0;
      box-shadow: 0 0 20px
        ${Color(NewTheme.primary).setAlpha(0.1).toRgbString()};
      &::placeholder {
        color: ${NewTheme.gray_400};
      }
    }

    ${props => {
      switch (props.size) {
        case 'large': {
          return css`
            height: calc(1.5em + 2rem + 2px);
            padding: 1rem 1.875rem;
            font-size: 1rem;
            border-radius: 0.5rem;
          `;
        }
        default:
          return null;
      }
    }}
    ${props => {
      switch (props.state) {
        case 'error': {
          return css`
            border-color: ${NewTheme.danger};
            &:focus {
              border-color: ${NewTheme.danger};
              box-shadow: 0 0 20px
                ${Color(NewTheme.danger).setAlpha(0.1).toRgbString()};
            }
          `;
        }
        default:
          return null;
      }
    }}
  }
`;
