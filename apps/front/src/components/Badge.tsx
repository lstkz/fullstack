import classNames from 'classnames';
import * as React from 'react';

interface BadgeProps {
  type:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'success'
    | 'warning'
    | 'info'
    | 'dark';
  children?: React.ReactNode;
  dot?: boolean;
}

export function Badge(props: BadgeProps) {
  const { children, dot, type } = props;

  return (
    <div
      className={classNames(
        'inline-block text-sm font-bold text-center rounded-md transition-all flex-shrink-0',
        dot ? 'w-3 h-3 rounded-full mr-1' : 'px-1 py-2',
        `bg-${type}`
      )}
    >
      {children}
    </div>
  );
}
