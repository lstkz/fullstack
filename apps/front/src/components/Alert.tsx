import React from 'react';
import { cx } from 'src/common/helper';

interface AlertProps {
  children: React.ReactNode;
  type: 'error' | 'success';
  testId?: string;
  className?: string;
}

export function Alert(props: AlertProps) {
  const { children, testId, type, className } = props;
  return (
    <div
      className={cx(
        'px-4 py-3 rounded-md mb-8 flex items-center',
        type === 'error' && 'bg-danger text-white',
        type === 'success' && 'bg-success text-white',
        className
      )}
      data-test={testId}
    >
      {children}
    </div>
  );
}
