import React from 'react';
import Link from 'next/link';
import { SpinnerBoarder } from './SpinnerBoarder';
import styles from './ButtonNext.module.css';
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
    styles.btn,
    styles['type-' + type],
    styles['size-' + (size ?? 'default')],
    className,
  ];

  if (href) {
    return (
      <Link href={href}>
        <a
          data-test={testId}
          onClick={onClick as any}
          className={classNames(classList)}
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
      className={classNames(classList)}
      type={htmlType || 'button'}
      ref={ref}
    >
      {inner}
    </button>
  );
});
