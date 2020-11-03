import * as React from 'react';
import styled from 'styled-components';
import { Theme } from '../Theme';

interface FormInputProps {
  className?: string;
  children: React.ReactNode;
  error?: string;
}

const ErrorMsg = styled.div`
  color: ${Theme.primary};
  margin-top: 2px;
`;

const _FormInput = (props: FormInputProps) => {
  const { className, children, error } = props;
  return (
    <div className={className}>
      {children}
      {error && <ErrorMsg>{error}</ErrorMsg>}
    </div>
  );
};

export const FormInput = styled(_FormInput)`
  display: block;
  margin-bottom: 20px;
`;
