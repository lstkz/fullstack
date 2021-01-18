import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Checkbox, CheckboxProps } from './Checkbox';

interface FormCheckboxProps
  extends Omit<CheckboxProps, 'isChecked' | 'onChange' | 'id'> {
  children: React.ReactNode;
  name: string;
}

export function FormCheckbox(props: FormCheckboxProps) {
  const { name, ...rest } = props;
  const { errors, register, watch, setValue } = useFormContext<any>();
  const error = errors[name]?.message;
  const isChecked = watch(name) ?? false;

  React.useEffect(() => {
    register(name);
  }, []);

  return (
    <Checkbox
      {...rest}
      id={name}
      feedback={error}
      isChecked={isChecked}
      onChange={value => {
        setValue(name, value, {
          shouldValidate: true,
        });
      }}
      state={error ? 'error' : undefined}
      testId={name}
    />
  );
}
