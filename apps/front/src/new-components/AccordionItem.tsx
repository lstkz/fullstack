import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';
import { Heading } from './Heading';
import { spacerStyle } from './_spacer';

interface AccordionItemProps {
  className?: string;
  header: React.ReactNode;
  children: React.ReactNode;
}

const Header = styled.div`
  padding: 1.5rem 1.75rem;
  svg {
    margin-right: 1rem;
  }
  ${spacerStyle};
`;
const Content = styled.div`
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1.75rem;
  color: ${NewTheme.gray_600};
`;

const _AccordionItem = (props: AccordionItemProps) => {
  const { className, header, children } = props;
  return (
    <div className={className}>
      <Header>
        <Heading type={6}>{header}</Heading>
      </Header>
      <Content>{children}</Content>
    </div>
  );
};

export const AccordionItem = styled(_AccordionItem)`
  display: flex;
  flex-direction: column;
  border-radius: 0.75rem;
  background-color: #fff;
  margin-bottom: 1.5rem;
  ${spacerStyle};
`;
