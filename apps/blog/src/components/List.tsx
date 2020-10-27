import React from 'react';
import styled from 'styled-components';
import { ArrowIcon } from './ArrowIcon';

export const List = styled.ul`
  padding: 0;
  margin: 0;
  margin-top: 20px;
  list-style: none;

  li + li {
    margin-top: 10px;
  }

  li,
  li a {
    display: flex;
    align-items: center;
  }

  svg {
    margin-right: 15px;
  }
`;

interface ListItemProps {
  className?: string;
  children?: React.ReactNode;
}

const _ListItem = (props: ListItemProps) => {
  const { className, children } = props;
  return (
    <li className={className}>
      <ArrowIcon />
      {children}
    </li>
  );
};

export const ListItem = styled(_ListItem)``;
