import * as React from 'react';
import { cx } from 'src/common/helper';

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
  className?: string;
}

export function Badge(props: BadgeProps) {
  const { children, dot, type, className } = props;

  return (
    <div
      className={cx(
        'inline-block text-sm font-bold text-center rounded-md transition-all flex-shrink-0',
        dot ? 'w-3 h-3 rounded-full mr-1' : 'px-2 py-1',
        `bg-${type}`,
        type === 'warning' ? 'text-white' : '',
        className
      )}
    >
      {children}
    </div>
  );
}
