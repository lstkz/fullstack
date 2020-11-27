import * as React from 'react';
import styled from 'styled-components';
import { Heading } from 'src/new-components/Heading';

interface AuthFormProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  bottom?: React.ReactNode;
  testId?: string;
  small?: boolean;
}

const Wrapper = styled.div<{ small?: boolean }>`
  max-width: ${props => (props.small ? 20 : 30)}rem;
  margin: 0 auto;
  padding-top: 8rem;
`;

const Top = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Bottom = styled.div`
  margin-top: 1.5rem;
  text-align: center;
`;

export function FullPageForm(props: AuthFormProps) {
  const { title, children, bottom, testId, small } = props;

  return (
    <Wrapper data-test={testId} small>
      <Top>
        <Heading type={3}>{title}</Heading>
      </Top>
      {children}
      {bottom && <Bottom>{bottom}</Bottom>}
    </Wrapper>
  );
}
