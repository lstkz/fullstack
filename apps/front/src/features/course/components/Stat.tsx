import * as React from 'react';
import { NewTheme } from 'src/NewTheme';
import styled from 'styled-components';

interface StatProps {
  className?: string;
  icon: React.ReactNode;
  title: React.ReactNode;
  value: React.ReactNode;
}

const Left = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  border-radius: 0.375rem;
  width: 3rem;
  height: 3rem;
  font-size: 1.125rem;
  box-shadow: 0 0 1.25rem rgba(31, 45, 61, 0.05);
  color: ${NewTheme.primary};
  background-color: white;
`;
const Right = styled.div`
  padding-left: 1rem;
`;

const Title = styled.div`
  font-size: 0.75rem;
  font-weight: 300;
  color: ${NewTheme.gray_600};
`;

const Value = styled.div`
  font-weight: 700;
  color: ${NewTheme.headings_color};
`;

const _Stat = (props: StatProps) => {
  const { className, icon, title, value } = props;
  return (
    <div className={className}>
      <Left>{icon}</Left>
      <Right>
        <Title>{title}</Title>
        <Value>{value}</Value>
      </Right>
    </div>
  );
};

export const Stat = styled(_Stat)`
  display: flex;
  padding: 0.5rem;
  align-items: center;
  background-color: ${NewTheme.secondary};
  border-radius: 0.75rem;
`;
