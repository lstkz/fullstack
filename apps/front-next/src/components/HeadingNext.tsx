import * as React from 'react';
import cn from 'classnames';

interface HeadingProps {
  className?: string;
  children: React.ReactNode;
  type: 1 | 2 | 3 | 4 | 5 | 6;
  id?: string;
  white?: boolean;
}

const tagMap = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
} as const;

const fontSize = {
  1: '5xl',
  2: '4xl',
  3: '3xl',
  4: '2xl',
  5: 'xl',
  6: 1,
} as const;

export function HeadingNext(props: HeadingProps) {
  const { className, type, children, id, white } = props;
  const Tag = tagMap[type];
  return (
    <Tag
      id={id}
      className={cn(
        `font-semibold text-${fontSize[type]}`,
        white ? 'text-white' : 'text-heading',
        className
      )}
    >
      {children}
    </Tag>
  );
}
