import classNames from 'classnames';
import React from 'react';

interface TaskSectionProps {
  children: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}

export function TaskSection({ children, className, title }: TaskSectionProps) {
  return (
    <>
      <h3
        className={classNames(
          'text-lg text-heading font-bold  mt-6 mb-4"',
          className
        )}
      >
        {title}
      </h3>
      {children}
    </>
  );
}
