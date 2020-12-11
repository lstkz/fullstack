import classNames from 'classnames';
import React from 'react';

interface TaskWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function TaskWrapper({ children, className }: TaskWrapperProps) {
  return (
    <div className={classNames('text-gray-800', className)}>{children}</div>
  );
}
