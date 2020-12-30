import React from 'react';
import classNames from 'classnames';

interface AlertProps {
  children: React.ReactNode;
  type: 'error';
  testId?: string;
}

export function Alert(props: AlertProps) {
  const { children, testId, type } = props;
  return (
    <div
      className={classNames(
        'px-4 py-3 rounded-md mb-8 flex items-center',
        type === 'error' && 'bg-danger text-white'
      )}
      data-test={testId}
    >
      {children}
    </div>
  );
}
