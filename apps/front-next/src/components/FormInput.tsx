import React from 'react';
import { Input, InputProps } from './Input';

interface FormInputProps extends Omit<InputProps, 'inputRef'> {
  name: string;
  noFeedback?: boolean;
  error?: string;
}

export const FormInput = React.forwardRef((props: FormInputProps, ref) => {
  const { name, noFeedback, error, ...rest } = props;

  const hasError = !!error;

  return (
    <Input
      inputRef={ref as any}
      data-error={hasError ? true : undefined}
      feedback={noFeedback ? '' : hasError ? error : ''}
      state={hasError ? 'error' : undefined}
      {...rest}
      name={name}
      id={rest.id ?? name}
    />
  );
});
