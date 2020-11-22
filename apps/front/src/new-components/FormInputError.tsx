import React, { useContext } from 'react';
import { FormContext } from 'typeless-form';
import { InputFeedback } from './Input';

interface FormInputErrorProps {
  name: string;
}

export const FormInputError = (props: FormInputErrorProps) => {
  const { name } = props;
  const data = useContext(FormContext);
  if (!data) {
    throw new Error(`${name} cannot be used without FormContext`);
  }
  const hasError = data.touched[name] && !!data.errors[name];
  const error = data.errors[name];
  if (!hasError) {
    return null;
  }
  return <InputFeedback color="danger">{error}</InputFeedback>;
};
