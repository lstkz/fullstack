import React from 'react';
import { useFormContext } from 'react-hook-form';
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

interface ContextFormInputProps extends Omit<FormInputProps, 'error'> {}

export const ContextFormInput = (props: ContextFormInputProps) => {
  const { name, ...rest } = props;
  const { errors, register } = useFormContext<any>();
  return (
    <FormInput
      {...rest}
      ref={register()}
      name={name}
      testId={`${name}-input`}
      error={errors[name]?.message}
    />
  );
};
