import classNames from 'classnames';
import React from 'react';

interface TaskTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function TaskTitle({ children, className }: TaskTitleProps) {
  return (
    <h2
      className={classNames('text-2xl text-heading font-bold mb-4', className)}
    >
      {children}
    </h2>
  );
}
