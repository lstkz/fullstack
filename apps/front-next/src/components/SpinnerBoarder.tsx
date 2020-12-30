import classNames from 'classnames';
import * as React from 'react';

interface SpinnerBoarderProps {
  className?: string;
  size?: 'sm';
}

export function SpinnerBoarder(props: SpinnerBoarderProps) {
  const { className, size } = props;
  return (
    <div
      className={classNames(
        className,
        'inline-block border-current rounded-full animate-spin',
        size === 'sm' && 'w-4 h-4 border',
        !size && 'w-8 h-8 border-4'
      )}
      style={{
        borderRightColor: 'transparent',
      }}
    />
  );
}
