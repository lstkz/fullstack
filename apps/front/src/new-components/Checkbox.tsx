import * as React from 'react';
import { isConfirmKey } from 'src/common/helper';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import Color from 'tinycolor2';

export interface CheckboxProps {
  className?: string;
  children?: React.ReactNode;
  id: string;
  checked: boolean;
  onChange: () => void;
}

const Icon = styled.div`
  border-radius: 0.375rem;
  width: 1rem;
  height: 1rem;
  background-color: ${NewTheme.gray_200};
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
  margin-right: 0.75rem;
`;

const Label = styled.div`
  line-height: 1.8;
  margin-bottom: 0;
`;

const _Checkbox = (props: CheckboxProps) => {
  const { className, checked, children, onChange } = props;
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
        console.log(e.key || e.nativeEvent.key);
        if (isConfirmKey(e.key || e.nativeEvent.key)) {
          e.preventDefault();
          onChange();
        }
      }}
    >
      <Icon />
      <Label>{children}</Label>
    </div>
  );
};
export const Checkbox = styled(_Checkbox)`
  display: flex;
  align-items: center;
  &[aria-checked='true'] {
    ${Icon} {
      background-color: ${NewTheme.primary};
    }
  }
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    ${Icon} {
      box-shadow: 0 0 0 0.15rem
        ${Color(NewTheme.primary).setAlpha(0.25).toRgbString()};
    }
  }
  &:active {
    ${Icon} {
      background-color: ${Color(NewTheme.primary_light)
        .lighten(15)
        .toHexString()};
    }
  }
`;
