import * as React from 'react';
import classNames from 'classnames';

interface IconProps {
  children?: React.ReactNode;
  size?: 'sm' | 'default';
  circle?: boolean;
  type: 'primary' | 'secondary' | 'danger' | 'warning' | 'success';
}

export function Icon(props: IconProps) {
  const { children, circle, size, type } = props;
  return (
    <div
      className={classNames(
        'inline-flex items-center justify-center rounded-md flex-shrink-0',
        circle && 'rounded-full',
        size === 'sm' ? `w-8 h-8 text-sm` : 'w-12 h-12',
        type === 'primary' && 'text-primary bg-primary-100',
        type === 'danger' && 'text-danger bg-danger-250',
        type === 'warning' && 'text-warning bg-warning-250',
        type === 'success' && 'text-success bg-success-350',
        type === 'secondary' && 'text-secondary bg-secondary-400'
      )}
    >
      {children}
    </div>
  );
}
