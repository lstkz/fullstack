import { Logo } from 'src/components/Logo';
import * as React from 'react';
import styled from 'styled-components';
import { Theme } from 'src/Theme';

interface TaskHeaderProps {
  className?: string;
}

const _TaskHeader = (props: TaskHeaderProps) => {
  const { className } = props;
  return (
    <div className={className}>
      <Logo type="light" />
    </div>
  );
};

export const TaskHeader = styled(_TaskHeader)`
  display: flex;
  align-items: center;
  background: ${Theme.dark};
  height: 40px;
  padding: 0 2rem;
  ${Logo} {
    h1 {
      font-size: 1.3rem;
    }
  }
`;
