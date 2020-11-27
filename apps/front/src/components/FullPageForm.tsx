import * as React from 'react';
import styled from 'styled-components';
import { Heading } from 'src/new-components/Heading';
import { NewTheme } from 'src/NewTheme';

interface AuthFormProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  subTitle?: React.ReactNode;
  bottom?: React.ReactNode;
  testId?: string;
  small?: boolean;
}

const Wrapper = styled.div<{ small?: boolean }>`
  max-width: ${props => (props.small ? 20 : 30)}rem;
  margin: 0 auto;
  padding-top: 8rem;
`;

const SubHeader = styled.div`
  margin-top: 0.25rem;
  color: ${NewTheme.gray_600};
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
  const { title, children, bottom, testId, small, subTitle } = props;

  return (
    <Wrapper data-test={testId} small={small}>
      <Top>
        <Heading type={3}>{title}</Heading>
        {subTitle && <SubHeader>{subTitle}</SubHeader>}
      </Top>
      {children}
      {bottom && <Bottom>{bottom}</Bottom>}
    </Wrapper>
  );
}
