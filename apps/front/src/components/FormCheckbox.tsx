import React, { useContext } from 'react';
import { FormContext } from 'typeless-form';
import { Checkbox, CheckboxProps } from './Checkbox';

interface FormCheckboxProps
  extends Omit<CheckboxProps, 'value' | 'onChange' | 'checked'> {
  name: string;
  noFeedback?: boolean;
}

export const FormCheckbox = (props: FormCheckboxProps) => {
  const { name, noFeedback, ...rest } = props;
  const data = useContext(FormContext);
  if (!data) {
    throw new Error(`${name} cannot be used without FormContext`);
  }
  const hasError = data.touched[name] && !!data.errors[name];
  const value = data.values[name];
  const inputProps: any = {};

  return (
    <Checkbox
      data-error={hasError ? true : undefined}
      feedback={noFeedback ? '' : hasError ? data.errors[name] : null}
      state={hasError ? 'error' : undefined}
      onBlur={() => data.actions.blur(name)}
      onChange={() => {
        data.actions.change(name, !value);
      }}
      {...inputProps}
      {...rest}
      checked={value === true}
      id={rest.id ?? name}
    />
  );
};
