import * as React from 'react';
import styled from 'styled-components';
import { MailIcon } from './MailIcon';

interface EmailMessageProps {
  className?: string;
  children: React.ReactNode;
}

const Text = styled.div`
  padding-bottom: 50px;
`;

const _EmailMessage = (props: EmailMessageProps) => {
  const { className, children } = props;
  return (
    <div className={className}>
      <MailIcon />
      <Text>{children}</Text>
    </div>
  );
};

export const EmailMessage = styled(_EmailMessage)`
  display: flex;
  padding: 30px 20px;
  font-weight: 450;
  font-size: 22px;
  text-align: center;
  color: #7c8092;
  justify-content: center;
  align-items: center;
  svg {
    max-width: 300px;
    margin-right: 10px;
    flex-shrink: 0;
  }
`;
