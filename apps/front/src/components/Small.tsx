import { Theme } from 'src/Theme';
import styled from 'styled-components';
import { spacerStyle, SpacerProps } from './_spacer';

export interface SmallProps extends SpacerProps {
  color?: 'primary' | 'warning' | 'danger';
}

export const Small = styled<SmallProps, 'div'>('div')`
  font-size: 80%;
  font-weight: 400;
  && {
    ${props => props.color && `color: ${Theme[props.color]};`}
  }
  ${spacerStyle}
`;
