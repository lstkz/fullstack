import classNames from 'classnames';
import * as React from 'react';
import { SvgCut } from './SvgCut';

interface SectionShapeProps {
  className?: string;
  inverse?: boolean;
  flip?: boolean;
  position: 'top' | 'bottom';
  color: string;
}

export function SectionShape(props: SectionShapeProps) {
  const { position, color, flip, inverse } = props;
  return (
    <div
      className={classNames(
        'absolute left-0 overflow-hidden w-full',
        ` text-${color}`
      )}
      style={{
        [position]: 0,
        zIndex: 3,
        transform: flip
          ? 'scaleX(-1);'
          : inverse
          ? 'rotate(180deg)'
          : undefined,
      }}
    >
      <SvgCut className="max-w-none fill-current" />
    </div>
  );
}
