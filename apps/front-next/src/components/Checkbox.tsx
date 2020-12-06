import * as React from 'react';
import { isConfirmKey } from 'src/common/helper';
import { Theme } from 'src/Theme';
import styled from 'styled-components';
import Color from 'tinycolor2';
import { InputFeedback } from './Input';

export interface CheckboxProps {
  className?: string;
  children?: React.ReactNode;
  id: string;
  checked: boolean;
  onChange: () => void;
  feedback?: string;
  state?: 'error';
}

const Icon = styled.div`
  border-radius: 0.375rem;
  width: 1rem;
  height: 1rem;
  background-color: ${Theme.gray_200};
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  margin-right: 0.75rem;
`;

const Label = styled.div`
  line-height: 1.8;
  margin-bottom: 0;
`;

const _Checkbox = (props: CheckboxProps) => {
  const { className, checked, children, onChange, feedback, state } = props;
  return (
    <div
      tabIndex={0}
      className={className}
      role="checkbox"
      aria-checked={checked}
      onClick={() => {
        onChange();
      }}
      onKeyPress={e => {
        if (isConfirmKey(e.key || e.nativeEvent.key)) {
          e.preventDefault();
          onChange();
        }
      }}
    >
      <Icon />
      <div>
        <Label>{children}</Label>
        {feedback && (
          <InputFeedback
            mt={0}
            color={state === 'error' ? 'danger' : undefined}
          >
            {feedback}
          </InputFeedback>
        )}
      </div>
    </div>
  );
};
export const Checkbox = styled(_Checkbox)`
  display: flex;
  align-items: center;
  &[aria-checked='true'] {
    ${Icon} {
      background: ${Theme.primary}
        url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3e%3cpath fill='%23FFF' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z'/%3e%3c/svg%3e")
        no-repeat center center;
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    ${Icon} {
      box-shadow: 0 0 0 0.15rem
        ${Color(Theme.primary).setAlpha(0.25).toRgbString()};
    }
  }
  &:active {
    ${Icon} {
      background-color: ${Color(Theme.primary_light).lighten(15).toHexString()};
    }
  }
`;
