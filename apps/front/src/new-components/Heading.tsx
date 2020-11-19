import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { SpacerProps, spacerStyle } from './_spacer';

interface HeadingProps extends SpacerProps {
  className?: string;
  children: React.ReactNode;
  type: 1 | 2 | 3 | 4 | 5 | 6;
  white?: boolean;
  center?: boolean;
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
  1: 2.5,
  2: 2,
  3: 1.75,
  4: 1.5,
  5: 1.25,
  6: 1,
} as const;

const _Heading = (props: HeadingProps) => {
  const { className, type, children } = props;
  const Tag = tagMap[type];
  return <Tag className={className}>{children}</Tag>;
};

export const Heading = styled(_Heading)`
  display: block;
  font-weight: 600;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.5;
  font-size: ${props => fontSize[props.type]}rem;
  color: ${NewTheme.headings_color};
  margin: 0;
  ${props => props.white && `color: white;`}
  ${props => props.center && `text-align: center;`}
  ${spacerStyle}
`;
