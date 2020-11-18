import * as React from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { Input } from './Input';

interface InputGroupProps {
  className?: string;
  input: React.ReactElement;
  append?: React.ReactElement;

  size?: 'small' | 'default' | 'large' | 'extra-large';
}

const _InputGroup = (props: InputGroupProps) => {
  const { className, input, append, size } = props;
  return (
    <div className={className}>
      {React.cloneElement(input, { size })}
      {append && React.cloneElement(append, { size })}
    </div>
  );
};

export const InputGroup = styled(_InputGroup)`
  display: flex;
  ${Input} {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    flex: 1 1 auto;
    width: 1%;
    min-width: 0;
  }
  ${Button} {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`;
