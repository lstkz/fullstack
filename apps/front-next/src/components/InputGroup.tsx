import classNames from 'classnames';
import * as React from 'react';

interface InputGroupProps {
  className?: string;
  input: React.ReactElement;
  append?: React.ReactElement;
  size?: 'small' | 'default' | 'large' | 'extra-large';
}

export function InputGroup(props: InputGroupProps) {
  const { className, input, append, size } = props;
  return (
    <div className={classNames('flex', className)}>
      {React.cloneElement(input, {
        size,
        className: 'flex-auto',
        inputClassName: 'rounded-r-none',
      })}
      {append &&
        React.cloneElement(append, { size, className: 'rounded-l-none' })}
    </div>
  );
}
