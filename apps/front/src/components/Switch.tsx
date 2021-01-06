import classNames from 'classnames';
import React from 'react';
import { cx } from 'src/common/helper';

export interface SwitchProps {
  onChange: (isChecked: boolean) => void;
  isChecked: boolean;
  'aria-label': string;
}

export function Switch(props: SwitchProps) {
  const { onChange, isChecked, ...rest } = props;
  return (
    <div
      {...rest}
      tabIndex={0}
      role="checkbox"
      aria-checked={isChecked}
      className={cx(
        'relative rounded-full p-1 w-12 h-6 cursor-pointer focus:opacity-80 outline-none ',
        isChecked ? 'bg-primary' : 'bg-gray-500'
      )}
      onClick={() => {
        onChange(!isChecked);
      }}
    >
      <div
        className={classNames(
          'absolute bg-white w-4 h-4 rounded-full transform transition-all',
          isChecked ? ' translate-x-6' : 'translate-x-0'
        )}
      />
    </div>
  );
}
