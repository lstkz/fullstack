import React, { useContext } from 'react';
import { FormContext } from 'typeless-form';
import { Input, InputProps } from './Input';

interface FormInputProps extends InputProps {
  name: string;
  noFeedback?: boolean;
}

export const FormInput = (props: FormInputProps) => {
  const { name, noFeedback, ...rest } = props;
  const data = useContext(FormContext);
  if (!data) {
    throw new Error(`${name} cannot be used without FormContext`);
  }
  const hasError = data.touched[name] && !!data.errors[name];
  const value = data.values[name];
  const inputProps: any = {};
  if (rest.type !== 'file') {
    inputProps.value = value == null ? '' : value;
  }
  return (
    <Input
      data-error={hasError ? true : undefined}
      feedback={noFeedback ? '' : hasError ? data.errors[name] : null}
      state={hasError ? 'error' : undefined}
      onBlur={() => data.actions.blur(name)}
      onChange={e => {
        data.actions.change(
          name,
          rest.type === 'file' ? e.target.files![0] : e.target.value
        );
      }}
      {...inputProps}
      {...rest}
    />
  );
};
