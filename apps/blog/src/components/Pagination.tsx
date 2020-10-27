import * as React from 'react';
import styled from 'styled-components';
import { Button } from './Button';

const Page = styled.li`
  margin: 0 4px;
  a {
    width: 52px;
    height: 52px;
    padding: 0;
    justify-content: center;
    font-size: 20px;
  }
`;

interface PaginationProps {
  className?: string;
  numPages: number;
  currentPage: number;
  getUrl(page: number): string;
}

const _Pagination = (props: PaginationProps) => {
  const { className, numPages, currentPage, getUrl } = props;

  return (
    <ul className={className}>
      {Array.from({ length: numPages }).map((_, i) => (
        <Page key={i}>
          <Button
            size="lg"
            type={currentPage === i + 1 ? 'solid' : 'gray'}
            href={getUrl(i + 1)}
          >
            {i + 1}
          </Button>
        </Page>
      ))}
    </ul>
  );
};

export const Pagination = styled(_Pagination)`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  margin: 50px 0;
  justify-content: center;
`;
