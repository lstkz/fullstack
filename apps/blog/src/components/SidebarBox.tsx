import * as React from 'react';
import styled from 'styled-components';
import { Box } from './Box';

interface SidebarBoxProps {
  className?: string;
  title: string;
  children: React.ReactNode;
}

const Title = styled.h2`
  font-weight: bold;
  font-size: 26px;
  line-height: 31px;
  margin: 0;
  margin-bottom: 10px;
`;

const _SidebarBox = (props: SidebarBoxProps) => {
  const { className, title, children } = props;
  return (
    <Box className={className}>
      <Title>{title}</Title>
      {children}
    </Box>
  );
};

export const SidebarBox = styled(_SidebarBox)`
  display: block;
  margin-bottom: 30px;
  padding: 25px 20px 30px;
`;
