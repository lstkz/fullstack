import React from 'react';
import Link from 'next/link';
import { SpinnerBoarder } from './SpinnerBoarder';
import classNames from 'classnames';

interface ButtonProps {
  children?: React.ReactNode;
  className?: string;
  block?: boolean;
  soft?: boolean;
  outline?: boolean;
  loading?: boolean;
  type: 'primary' | 'secondary' | 'danger' | 'dark' | 'neutral' | 'warning';
  size?: 'extra-small' | 'small' | 'default' | 'large' | 'extra-large';
  href?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  htmlType?: 'button' | 'submit' | 'reset';
  onClick?: (
    e: React.MouseEvent<HTMLAnchorElement | HTMLDivElement, MouseEvent>
  ) => void;
  testId?: string;
}

export const ButtonNext = React.forwardRef((props: ButtonProps, ref: any) => {
  const {
    className,
    onClick,
    children,
    htmlType,
    loading,
    disabled,
    testId,
    icon,
    href,
    type,
    size,
  } = props;
  const inner = (
    <>
      {(loading || icon) && (
        <div className="mr-3">
          {loading ? <SpinnerBoarder size="sm" /> : icon}
        </div>
      )}
      {children}
    </>
  );
  const classList = [
    'inline-flex item-center justify-center transition-all border border-transparent font-semibold leading-normal focus:ring focus:outline-none outline-none',
  ];

  switch (type) {
    case 'primary':
      classList.push(
        'text-white bg-primary border-color-primary',
        'hover:bg-primary-600 hover:border-color-primary-700',
        'active:bg-primary-700 active:border-color-primary-800',
        'focus:ring-primary-ring'
      );
      break;
    case 'secondary':
      classList.push(
        'text-gray-900 bg-secondary border-color-secondary ',
        'hover:bg-secondary-600 hover:border-color-secondary-700',
        'active:bg-secondary-700 active:border-color-secondary-800',
        'focus:ring-secondary-ring'
      );
      break;
    case 'warning':
      break;
    case 'neutral':
      break;
  }
  switch (size) {
    case 'small':
      classList.push('text-sm py-2 px-5 rounded-md');
      break;
    default:
      classList.push('py-3 px-7 rounded-md');
      break;
  }

  if (href) {
    return (
      <Link href={href}>
        <a
          data-test={testId}
          onClick={onClick as any}
          className={classNames(classList, className)}
          ref={ref}
        >
          {inner}
        </a>
      </Link>
    );
  }
  return (
    <button
      data-test={testId}
      disabled={loading || disabled}
      onClick={onClick as any}
      className={classNames(classList, className)}
      type={htmlType || 'button'}
      ref={ref}
    >
      {inner}
    </button>
  );
});
