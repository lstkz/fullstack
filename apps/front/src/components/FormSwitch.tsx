import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Switch, SwitchProps } from './Switch';

interface FormSwitchProps extends Omit<SwitchProps, 'onChange' | 'isChecked'> {
  name: string;
}

export function FormSwitch(props: FormSwitchProps) {
  const { name, ...rest } = props;
  const { watch, register, setValue } = useFormContext<any>();

  const isChecked = watch(name);

  React.useEffect(() => {
    register(name);
  }, []);

  return (
    <Switch
      {...rest}
      isChecked={isChecked}
      onChange={value => {
        setValue(name, value);
      }}
    />
  );
}
