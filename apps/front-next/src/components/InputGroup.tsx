import classNames from 'classnames';
import * as React from 'react';
import styles from './InputGroup.module.css';

interface InputGroupProps {
  className?: string;
  input: React.ReactElement;
  append?: React.ReactElement;
  size?: 'small' | 'default' | 'large' | 'extra-large';
}

export function InputGroup(props: InputGroupProps) {
  const { className, input, append, size } = props;
  return (
    <div className={classNames('flex', className, styles.inputGroup)}>
      {React.cloneElement(input, {
        size,
        className: 'flex-auto',
      })}
      {append && React.cloneElement(append, { size })}
    </div>
  );
}
