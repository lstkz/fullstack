import * as React from 'react';
import styled from 'styled-components';
import { Heading } from 'src/components/Heading';
import { Theme } from 'src/Theme';

interface AuthFormProps {
  className?: string;
  title: string;
  children: React.ReactNode;
  subTitle?: React.ReactNode;
  bottom?: React.ReactNode;
  testId?: string;
}

const Wrapper = styled.div<{ small?: boolean }>`
  max-width: 30rem;
  margin: 0 auto;
  padding-top: 8rem;
  width: 100%;
  padding: 8rem 2rem;
`;

const SubHeader = styled.div`
  margin-top: 0.25rem;
  color: ${Theme.gray_600};
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
  const { title, children, bottom, testId, subTitle } = props;

  return (
    <Wrapper data-test={testId}>
      <Top>
        <Heading type={3}>{title}</Heading>
        {subTitle && <SubHeader>{subTitle}</SubHeader>}
      </Top>
      {children}
      {bottom && <Bottom>{bottom}</Bottom>}
    </Wrapper>
  );
}
